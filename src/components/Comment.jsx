import Reply from "./Reply";
import ReplyButton from "./ReplyButton";
import CustomizeButtons from "./CustomizeButtons";

export default function Comment(props) {
  const isReply = props.comment.replies ? false : true;
  const replies = isReply ? [] : props.comment.replies;

  return (
    <div className={`flex w-full flex-col gap-2 ${isReply ? "pl-[10%]" : ""}`}>
      <div className="bg-White xs:flex-row flex w-full flex-col gap-4 rounded-[0.2rem] p-4">
        <div className="xs:order-0 order-1 flex flex-row items-center justify-between">
          <div className="xs:flex-col flex flex-row">
            <button>+</button>
            <p>{props.comment.score}</p>
            <button>-</button>
          </div>

          <div className="xs:hidden">buttons</div>
        </div>

        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <img
                src={props.comment.user.image.png}
                alt={props.comment.user.username}
              />
              <p>{props.comment.user.username}</p>
              <p>
                {props.comment.createdAt} {isReply.toString()}
              </p>
            </div>

            <div className="xs:inline-block hidden">
              <ReplyButton />
              {/* <CustomizeButtons /> */}
            </div>
          </div>

          <div className="">{props.comment.content}</div>
        </div>
      </div>
      {replies.length > 0 &&
        props.comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
    </div>
  );
}
