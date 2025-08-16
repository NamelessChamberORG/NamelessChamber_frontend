import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import WriteDiaryPage from "../features/diary/pages/WriteDiaryPage";
import LandingPage from "../features/diary/pages/LandingPage";
import SubmitDiaryPage from "../features/diary/pages/SubmitDiaryPage";
import DiaryDetailPage from "../features/diary/pages/DiaryDetailPage";
import PostSubmitThanks from "../features/diary/pages/PostSubmitThanks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/diary",
        element: <SubmitDiaryPage />,
      },
      {
        path: "/diary/:id",
        element: <DiaryDetailPage />,
      },
    ],
  },
  {
    path: "/diary/submit",
    element: <PostSubmitThanks />,
  },
  {
    path: "/diary/new",
    element: <WriteDiaryPage />,
  },
]);

export default router;
