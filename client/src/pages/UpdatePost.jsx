import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UpdatePost = () => {
  const [file, setfiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publisherror, setpublisherror] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageref = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageref, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Please select an image");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setpublisherror(data.message);
          return;
        }
        setFormData(data.posts[0]);
      };
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  console.log(formData, "OP");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      // console.log(data, "DOI");
      if (!res.ok) {
        setpublisherror(data.message);
        return;
      }
      if (res.ok) {
        setpublisherror(null);
        navigate(`/post/${data?.slug}`);
      }
    } catch (error) {
      console.log(error);
      setpublisherror("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-center ">
          <TextInput
            type="text"
            placeholder="Title"
            className=" w-full sm:w-3/4 "
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            value={formData.title}
          />
          <Select
            className="flex-2 sm:w-1/4  "
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            value={formData.category}
          >
            <option value="uncategorized" className="font-thin">
              Select category
            </option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="nextjs">Nextjs</option>
          </Select>
        </div>
        <div className=" flex gap-4 items-baseline justify-between border-4 border-teal-400 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setfiles(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            size="sm"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {" "}
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress || 0}
                  text={`${imageUploadProgress}%` || 0}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something"
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"}>
          Update Post
        </Button>
        {publisherror && (
          <Alert className="mt-5" color="failure">
            {publisherror}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
