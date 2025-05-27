import { useCommentsContext } from "../hooks/useCommentsContext";
import Comment from "./Comment";
import AddComment from "./AddComment";

export default function CommentsSection() {
  const { comments } = useCommentsContext();
  return (
    <section className="flex w-full max-w-[45rem] flex-col gap-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <AddComment />
    </section>
  );
}
