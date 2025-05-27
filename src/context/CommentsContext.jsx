import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export const CommentsContext = createContext();

export default function CommentsContextProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // Load data
  useEffect(() => {
    const commentsData = sessionStorage.getItem("comments");
    const currentUserData = sessionStorage.getItem("currentUser");

    if (commentsData && currentUserData) {
      const commentsSessionData = JSON.parse(commentsData);
      setComments(commentsSessionData);

      const userSessionData = JSON.parse(currentUserData);
      setCurrentUser(userSessionData);
    } else {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setCurrentUser(data.currentUser);
          sessionStorage.setItem("comments", JSON.stringify(data.comments));
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(data.currentUser),
          );
        });
    }
  }, []);

  const handleVote = (commentId, type) => {
    const username = currentUser.username;

    const commentBelongsToUser = (comment) =>
      comment.user.username === username;

    const voteKey = commentId;
    const previousVote = currentUser.voteKey?.[voteKey];

    if (previousVote === type) return;

    const updatedComments = [...comments];

    const updateScore = (commentsArray) => {
      for (let comment of commentsArray) {
        if (comment.id === voteKey) {
          if (commentBelongsToUser(comment)) return;

          if (previousVote === "up") comment.score -= 1;
          else if (previousVote === "down") comment.score += 1;

          if (!previousVote) {
            if (type === "up") comment.score += 1;
            else if (type === "down") comment.score -= 1;
          }

          return;
        }

        if (comment.replies) updateScore(comment.replies);
      }
    };

    updateScore(updatedComments);

    const updatedUser = {
      ...currentUser,
      voteKey: {
        ...currentUser.voteKey,
        [voteKey]: type,
      },
    };

    setComments(updatedComments);
    setCurrentUser(updatedUser);
    sessionStorage.setItem("comments", JSON.stringify(updatedComments));
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const handleDelete = (commentId) => {
    const removeCommentById = (commentsArray, id) => {
      return commentsArray
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: comment.replies
            ? removeCommentById(comment.replies, id)
            : [],
        }));
    };

    const updatedComments = removeCommentById(comments, commentId);

    setComments(updatedComments);
    sessionStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const addReply = (parentId, reply) => {
    setComments((prev) => {
      const addReplyRecursive = (comments) => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: addReplyRecursive(comment.replies),
            };
          }
          return comment;
        });
      };

      const updatedComments = addReplyRecursive(prev);
      sessionStorage.setItem("comments", JSON.stringify(updatedComments));
      return updatedComments;
    });
  };

  const generateUniqueId = () => uuidv4();
  const getCreatedAt = () => "Just now";

  const handleAddComment = ({ content, type, parentId, replyingTo }) => {
    const trimmedContent = content.trim();
    if (trimmedContent === "") return;

    const newId = generateUniqueId();

    const newCommentOrReply = {
      id: newId,
      content: trimmedContent,
      createdAt: getCreatedAt(),
      score: 0,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
    };

    if (type === "reply") {
      newCommentOrReply.replyingTo = replyingTo;
      newCommentOrReply.parentComment = parentId;

      addReply(parentId, newCommentOrReply);
    } else {
      newCommentOrReply.replies = [];

      setComments((prevComments) => {
        const updated = [...prevComments, newCommentOrReply];
        sessionStorage.setItem("comments", JSON.stringify(updated));
        return updated;
      });
    }

    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  const editComment = (commentId, newContent) => {
    setComments((prev) => {
      const editRecursive = (comments) =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              content: newContent,
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: editRecursive(comment.replies),
            };
          }
          return comment;
        });

      const updatedComments = editRecursive(prev);
      sessionStorage.setItem("comments", JSON.stringify(updatedComments));
      return updatedComments;
    });
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
        handleVote,
        handleDelete,
        setComments,
        addReply,
        handleAddComment,
        editComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
