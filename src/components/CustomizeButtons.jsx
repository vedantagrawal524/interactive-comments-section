import { useCommentsContext } from "../hooks/useCommentsContext";

export default function CustomizeButtons(props) {
  const { handleDelete } = useCommentsContext();
  return (
    <div className="flex flex-row items-center gap-3">
      <button
        onClick={() => handleDelete(props.commentId)}
        type="button"
        className="text-Pink-400 flex flex-row items-center justify-center gap-1 text-[0.9rem] font-[600] hover:cursor-pointer hover:opacity-60"
      >
        <img
          src="/images/icon-delete.svg"
          alt="Reply"
          className="h-auto w-2.5"
        />
        Delete
      </button>

      <button className="text-Purple-600 flex flex-row items-center justify-center gap-1 text-[0.9rem] font-[600] hover:cursor-pointer hover:opacity-60">
        <img src="/images/icon-edit.svg" alt="Reply" className="h-auto w-3" />
        Edit
      </button>
    </div>
  );
}
