import { createContext, useState, useEffect } from "react";

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

  return (
    <CommentsContext.Provider
      value={{
        comments,
        currentUser,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
