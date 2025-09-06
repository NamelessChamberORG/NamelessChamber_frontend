import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DiaryWritePage from "../features/diary/pages/DiaryWritePage";
import LandingPage from "../features/diary/pages/LandingPage";
import DiaryListPage from "../features/diary/pages/DiaryListPage";
import DiaryDetailPage from "../features/diary/pages/DiaryDetailPage";
import DiaryPostSubmitPage from "../features/diary/pages/DiaryPostSubmitPage";
import { PATHS } from "../constants/path";
import NotFoundPage from "../features/error/pages/NotFoundPage";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import SetNicknamePage from "../features/user/pages/SetNicknamePage";

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
        path: PATHS.DIARY_LIST,
        element: <DiaryListPage />,
      },
      {
        path: PATHS.DIARY_DETAIL,
        element: <DiaryDetailPage />,
      },
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <SignupPage />,
      },
      {
        path: PATHS.NICKNAME,
        element: <SetNicknamePage />,
      },
    ],
  },
  {
    path: PATHS.DIARY_SUBMIT,
    element: <DiaryPostSubmitPage />,
  },
  {
    path: PATHS.DIARY_NEW,
    element: <DiaryWritePage />,
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
