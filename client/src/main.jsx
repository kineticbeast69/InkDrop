import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context provider
import { NoteProvider } from "./context/notes.jsx";
// pages are over here
import App from "./App.jsx";
import Home from "./pages/homePage.jsx";
import Register from "./pages/registerPage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/:userID/notes",
    element: <Home />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoteProvider>
      <RouterProvider router={routes} /> {/*route function*/}
      <ToastContainer /> {/* notification */}
    </NoteProvider>
  </StrictMode>
);
