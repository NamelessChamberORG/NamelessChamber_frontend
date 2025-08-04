import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import WriteDiaryPage from "../features/diary/pages/WriteDiaryPage";
import LandingPage from "../features/diary/pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/diary/new",
    element: <WriteDiaryPage />,
  },
]);

export default router;
