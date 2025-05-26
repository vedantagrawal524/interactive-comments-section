export default function ReplyButton() {
  return (
    <button className="text-Purple-600 flex flex-row items-center justify-center gap-1.5 text-[0.9rem] font-[600] hover:cursor-pointer hover:opacity-60">
      <img src="/images/icon-reply.svg" alt="Reply" className="h-auto w-3" />
      Reply
    </button>
  );
}
