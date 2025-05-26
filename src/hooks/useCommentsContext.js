import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";

export function useCommentsContext() {
  return useContext(CommentsContext);
}
