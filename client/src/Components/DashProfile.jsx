import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../../firebase";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imagefile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagefileUploadProgress, setimagefileUploadProgress] = useState(null);
  const [imagefileuploaderror, setimagefileuploaderror] = useState(null);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserError, setupdateUserError] = useState(null);
  const [imageFileUpload, setImageFileUpload] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formdata, setFormdata] = useState({});
  const filePickRef = useRef();
  console.log(imagefileUploadProgress, imagefileuploaderror, "pop");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // createobject url is used to make the image clickable and to open it in different tab
    }
  };
  console.log(currentUser.profilePicture, "ko");
  useEffect(() => {
    if (imagefile) {
      uploadImage();
    }
  }, [imagefile]);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
  console.log(formdata, "OP");
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size<2*1024*1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUpload(true);
    setimagefileuploaderror(null);
    console.log("loding.....");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imagefile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imagefile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setimagefileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setimagefileuploaderror("Could not upload image( file must be <2mb )");
        setimagefileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormdata({ ...formdata, profilePicture: downloadURL });
          setImageFileUpload(false);
          setimagefileuploaderror(null);
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setupdateUserError(null);
    setupdateUserSuccess(null);
    console.log(formdata, "kop");
    if (Object.keys(formdata.length === 0)) {
      setupdateUserError("No changes Made");
      return;
    }
    console.log(imageFileUpload, "kop");
    if (imageFileUpload) {
      setupdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setupdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setupdateUserSuccess("User profile updated Successsfully ");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setupdateUserError(error.message);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickRef}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer rounded-full shadow-md overflow-hidden"
          onClick={() => filePickRef.current.click()}
        >
          {imagefileUploadProgress && (
            <CircularProgressbar
              value={imagefileUploadProgress || 0}
              text={`${imagefileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imagefileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser?.profilePicture}
            className={`rounded-full w-full h-full border-8 border-[lightGray] object-cover ${
              imagefileUploadProgress &&
              imagefileUploadProgress < 100 &&
              "opacity-50"
            }`}
            alt="user"
          />
        </div>
        {imagefileuploaderror && (
          <Alert color="failure">{imagefileuploaderror}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="  Enter Username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="  Enter Email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="password"
          placeholder="  Enter Password"
          defaultValue={"*******"}
          onChange={handleChange}
        />
        <Button type="submit" outline disabled={loading || imageFileUpload}>
          {" "}
          Update
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone={"purpleToPink"}
              className="w-full"
            >
              {" "}
              Create a Post{" "}
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && <Alert color="success">{updateUserSuccess}</Alert>}
      {error && <Alert color="failure">{error}</Alert>}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete your account ?{" "}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {" "}
                Yes I&apos;m Sure{" "}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                {" "}
                No Cancel{" "}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
