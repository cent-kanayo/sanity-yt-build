import { Post } from "../typings";
import PortableText from "react-portable-text";
import { urlFor } from "../sanity";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import Comments from "./Comments";

interface Prop {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
const SinglePost = ({ post }: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        setSubmitted(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  useEffect(() => {
    const time = setTimeout(() => {
      setSubmitted(false);
    }, 5000);
    return () => clearTimeout(time);
  }, [submitted]);
  return (
    <main>
      <img
        src={urlFor(post.mainImage.asset._ref).toString()}
        alt={post.author.name}
        className="w-full h-40 object-cover"
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).toString()}
            alt={post.author.name}
            className="h-10 w-10 rounded-full"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                <h1 className="text-2xl font-bold my-5">{props}</h1>;
              },
              h2: (props: any) => {
                <h2 className="text-xl font-bold my-5">{props}</h2>;
              },
              img: (props: any) => {
                <img src={props} alt="" className="w-60" />;
              },
              li: ({ children }: any) => {
                <li className="ml-4 list-disc">{children}</li>;
              },
              link: ({ href, children }: any) => {
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>;
              },
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      {submitted && (
        <div className="max-w-2xl mx-auto flex flex-col py-6 px-4 my-10 bg-yellow-500 text-white">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment
          </h3>
          <p>Once it has approved, it will appear below!</p>
        </div>
      )}
      <form
        className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
        <h3 className="text-3xl font-bold">Leave a comment below</h3>
        <hr className="py-3 mt-2" />

        <label className="block mb-5">
          <input
            type="hidden"
            {...register("_id")}
            name="_id"
            value={post._id}
          />
          <span className="text-gray-700">Name</span>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="John Doe"
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Email</span>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="john@email.comn"
            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-700">Comment</span>
          <textarea
            {...register("comment", { required: true })}
            rows={8}
            placeholder="Add your comment here"
            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none"
          />
        </label>
        <div className="flex flex-col p-5">
          {errors.name && (
            <span className="text-red-500">The name Field Is Required</span>
          )}
          {errors.email && (
            <span className="text-red-500">The Email Field Is Required</span>
          )}
          {errors.comment && (
            <span className="text-red-500">The name Comment Is Required</span>
          )}
        </div>
        <input
          type="submit"
          className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
      <Comments comments={post.comment} />
    </main>
  );
};

export default SinglePost;
