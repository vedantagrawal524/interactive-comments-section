import Reply from "./Reply";
import ReplyButton from "./ReplyButton";
import CustomizeButtons from "./CustomizeButtons";
import { useCommentsContext } from "../hooks/useCommentsContext";

export default function Comment(props) {
  const { currentUser } = useCommentsContext();
  const isReply = props.comment.replies ? false : true;
  const haveReplies =
    !isReply && props.comment.replies.length > 0 ? true : false;

  const isCurrentUser =
    currentUser.username === props.comment.user.username ? true : false;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="bg-White flex flex-col rounded-[0.4rem] p-4 md:p-6">
        <div className="xs:flex-row flex w-full flex-col gap-4">
          <div className="xs:order-0 xs:items-start order-1 flex flex-row items-center justify-between">
            <div className="xs:flex-col bg-Grey-50 flex h-fit w-fit flex-row items-center justify-center gap-1 rounded-[0.7rem] p-1">
              <button className="group flex h-7 w-7 items-center justify-center rounded-full hover:cursor-pointer">
                <svg
                  width="11"
                  height="11"
                  xmlns="http://www.w3.org/2000/svg"
                  alt="Plus"
                  className="h-auto w-3 rounded-full"
                >
                  <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF"
                    className="group-hover:fill-Purple-600"
                  />
                </svg>
              </button>
              <p className="text-Purple-600 text-[0.9rem] font-[600]">
                {props.comment.score}
              </p>

              <button className="group flex h-7 w-7 items-center justify-center rounded-full hover:cursor-pointer">
                <svg
                  width="11"
                  height="3"
                  xmlns="http://www.w3.org/2000/svg"
                  alt="Minus"
                  className="h-auto w-3 rounded-full"
                >
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                    className="group-hover:fill-Purple-600"
                  />
                </svg>
              </button>
            </div>

            <div className="xs:hidden">
              {isCurrentUser ? <CustomizeButtons /> : <ReplyButton />}
            </div>
          </div>

          <div className="flex w-full flex-col justify-center gap-3">
            <div className="xs:justify-between flex w-full flex-row items-center">
              <div className="flex w-fit flex-row items-center gap-3">
                <img
                  src={props.comment.user.image.png}
                  alt={props.comment.user.username}
                  className="h-auto w-7"
                />
                <p className="text-Grey-800 font-[600]">
                  {props.comment.user.username}
                </p>

                {isCurrentUser ? (
                  <div className="bg-Purple-600 text-White flex h-4 w-6 items-center justify-center rounded-[0.1rem] px-4 text-center text-[0.75rem] font-[400]">
                    you
                  </div>
                ) : (
                  ""
                )}

                <p className="text-Grey-500 ml-1 text-[0.8rem] leading-[1.4rem] font-[400]">
                  {props.comment.createdAt}
                </p>
              </div>

              <div className="xs:inline-block hidden">
                {isCurrentUser ? <CustomizeButtons /> : <ReplyButton />}
              </div>
            </div>
            <div className="text-Grey-500 w-full text-[0.95rem] leading-[1.4rem] font-[400]">
              {isReply && (
                <span className="text-Purple-600 font-[500]">
                  {"@"}
                  {props.comment.replyingTo}{" "}
                </span>
              )}

              {props.comment.content}
            </div>
          </div>
        </div>

        {/* <button className="bg-Purple-600 text-White mt-2 w-fit self-end rounded-[0.4rem] px-4 py-2 text-[0.9rem] font-[400] tracking-wide uppercase hover:cursor-pointer">
          {" "}
          Update
        </button> */}
      </div>
      <div
        className={`xs:ml-[5%] border-Grey-100 flex flex-col gap-4 border-l-2 pl-[5%] ${haveReplies ? "" : "hidden"}`}
      >
        {haveReplies &&
          props.comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
      </div>
    </div>
  );
}
