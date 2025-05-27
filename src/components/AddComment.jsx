import { useState } from "react";
import { useCommentsContext } from "../hooks/useCommentsContext.js";

export default function AddComment({
  type = "comment",
  parentId = null,
  replyingTo = "",
  onClose,
}) {
  const { currentUser, handleAddComment } = useCommentsContext();
  const [newComment, setNewComment] = useState("");

  const submitComment = () => {
    const content = newComment.trim();
    if (content === "") return;

    handleAddComment({
      content,
      type,
      parentId,
      replyingTo,
    });

    setNewComment("");
    if (onClose) onClose();
  };

  return (
    <div className="bg-White xs:flex-row flex w-full flex-col justify-center gap-4 rounded-[0.4rem] p-4 md:p-6">
      <div className="xs:order-0 xs:items-start xs:justify-center order-1 flex h-fit flex-row items-center justify-between">
        {currentUser.image?.png && (
          <img
            src={currentUser.image.png}
            alt="Current User"
            className="xs:w-12 h-auto w-9"
          />
        )}
        <button
          className="xs:hidden bg-Purple-600 text-White rounded-[0.4rem] px-4 py-2 text-[0.9rem] font-[400] tracking-wide uppercase hover:cursor-pointer"
          onClick={submitComment}
          type="button"
        >
          {type === "reply" ? "Reply" : "Send"}
        </button>
      </div>

      <textarea
        name="comment"
        id="comment"
        placeholder={
          type === "reply" ? `Reply to @${replyingTo}` : "Add a comment..."
        }
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="outline-Grey-100 placeholder:text-Grey-500 text-Grey-500 hover:outline-Grey-500 h-[4.5rem] w-full resize-none rounded-[0.4rem] px-4 py-2 text-[0.95rem] leading-[1.15rem] font-[400] outline-2 placeholder:text-[0.85rem] placeholder:font-[500] placeholder:opacity-50 hover:cursor-pointer"
      ></textarea>

      <button
        className="xs:inline-block bg-Purple-600 text-White hidden self-start rounded-[0.4rem] px-4 py-2 text-[0.9rem] font-[400] tracking-wide uppercase hover:cursor-pointer hover:opacity-60"
        onClick={submitComment}
        type="button"
      >
        {type === "reply" ? "Reply" : "Send"}
      </button>
    </div>
  );
}
