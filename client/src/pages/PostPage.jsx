import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CalltoAction from "../Components/CalltoAction";
import CommentSection from "../Components/CommentSection";
import PostCard from "./PostCard";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [post, setPost] = useState();
  const [recentPost, setRecentPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(true);
      }
    };
    fetchPost();
  }, [postSlug]);
  useEffect(() => {
    try {
      const fetchRecentposts = async () => {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
      };
      fetchRecentposts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl ">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color={"gray"} pill size="xs" className="p-2">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] m-auto w-full max-w-4xl object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div>
        <div
          className="p-3 max-w-4xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
        <div className="max-w-4xl m-auto">
          <CalltoAction />
        </div>
        <div className="max-w-4xl m-auto">
          <CommentSection postId={post._id} />
        </div>
        <div className="flex flex-col justify-center  items-center">
          <h1 className="text-xl mt-5 mb-5">Recent Articles</h1>
          <div className="flex gap-4">
            {recentPost &&
              recentPost.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
