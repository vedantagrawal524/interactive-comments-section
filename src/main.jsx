import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import CommentsContextProvider from "./context/CommentsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CommentsContextProvider>
        <App />
      </CommentsContextProvider>
    ),
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
