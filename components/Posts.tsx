import Link from "next/link";
import { Post } from "../typings";
import { urlFor } from "../sanity";
interface Props {
  post: Post[];
}
const Posts = ({ post }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
      {post.map((postItem) => (
        <Link key={postItem._id} href={`/posts/${postItem.slug.current}`}>
          <article className="group cursor-pointer border rounded-lg overflow-hidden">
            <img
              src={urlFor(postItem.mainImage.asset._ref)
                .auto("format")
                .fit("max")
                .width(400)
                .toString()}
              alt={postItem.author.name}
              className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
            />
            <div className="flex justify-between p-5 bg-white">
              <div>
                <p className="text-lg font-bold">{postItem.title}</p>
                <p className="text-xs">
                  {postItem.description} by {postItem.author.name}
                </p>
              </div>
              <img
                src={urlFor(postItem.author.image)
                  .auto("format")
                  .fit("max")
                  .toString()}
                alt={postItem.author.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
