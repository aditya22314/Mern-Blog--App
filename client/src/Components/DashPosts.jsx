import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showmore, setShowmore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdtoDelete, setpostIdToDelete] = useState(null);
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deleteposts/${postIdtoDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdtoDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);

        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.post.length < 9) {
            setShowmore(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);
  console.log(showmore, "SHOWMORE");
  const handleShowmore = async () => {
    const startIndex = userPosts.length;
    console.log(startIndex, "POOTT ");
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="table-auto  md:mx-auto p-3 scrollbar scrollbar-track-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md mt-5">
            <Table.Head>
              <Table.HeadCell> Date Updated</Table.HeadCell>
              <Table.HeadCell> Post Image</Table.HeadCell>
              <Table.HeadCell> Post title</Table.HeadCell>
              <Table.HeadCell> Category</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
              <Table.HeadCell> Delete</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                {console.log(post.slug, "SLUG")}
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500"
                      to={`/update-post/${post._id}`}
                    >
                      <span className="font-medium text-red-500 hover:underline">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setpostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showmore && (
            <button
              onClick={handleShowmore}
              className="w-full  text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no post yet </p>
      )}
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
              Are you sure you want to delete this post?{" "}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashPosts;
