import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DiaryWritePage from "../features/diary/pages/DiaryWritePage";
import LandingPage from "../features/diary/pages/LandingPage";
import DiaryListPage from "../features/diary/pages/DiaryListPage";
import DiaryDetailPage from "../features/diary/pages/DiaryDetailPage";
import DiaryPostSubmitPage from "../features/diary/pages/DiaryPostSubmitPage";

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
        element: <DiaryListPage />,
      },
      {
        path: "/diary/:id",
        element: <DiaryDetailPage />,
      },
    ],
  },
  {
    path: "/diary/submit",
    element: <DiaryPostSubmitPage />,
  },
  {
    path: "/diary/new",
    element: <DiaryWritePage />,
  },
]);

export default router;
