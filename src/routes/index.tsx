import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DiaryWritePage from "../features/diary/pages/DiaryWritePage";
import LandingPage from "../features/diary/pages/LandingPage";
import DiaryListPage from "../features/diary/pages/DiaryListPage";
import DiaryDetailPage from "../features/diary/pages/DiaryDetailPage";
import DiaryPostSubmitPage from "../features/diary/pages/DiaryPostSubmitPage";
import { PATHS } from "../constants/path";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        path: PATHS.HOME,
        element: <LandingPage />,
      },
      {
        path: "/diary/:type",
        element: <DiaryListPage />,
      },
      {
        path: "/diary/:id",
        element: <DiaryDetailPage />,
      },
    ],
  },
  {
    path: "/diary/submit/:type",
    element: <DiaryPostSubmitPage />,
  },
  {
    path: "/diary/new/:type",
    element: <DiaryWritePage />,
  },
]);

export default router;
