import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import WriteDiaryPage from "../features/diary/pages/WriteDiaryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
    ],
  },
  {
    path: "/write",
    element: <WriteDiaryPage />,
  },
]);

export default router;
