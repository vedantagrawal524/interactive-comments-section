import { useCommentsContext } from "../hooks/useCommentsContext";
import Comment from "./Comment";
import Reply from "./Reply";
import AddComment from "./AddComment";

export default function CommentsSection() {
  const { comments } = useCommentsContext();
  return (
    <section className="flex w-full flex-col gap-2 bg-red-200">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <AddComment />
    </section>
  );
}
