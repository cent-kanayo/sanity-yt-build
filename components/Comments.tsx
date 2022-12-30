import { Comment } from "../typings";

interface Props {
  comments: Comment[];
}
const Comments = ({ comments }: Props) => {
  return (
    <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2 ">
      <h3 className="text-4xl">Comments</h3>
      <hr className="pb-2" />
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>
            <span>{comment.name}:</span> {comment.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
