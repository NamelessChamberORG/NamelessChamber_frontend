import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import LandingPage from "../features/diary/pages/LandingPage";
import DiaryListPage from "../features/diary/pages/DiaryListPage";
import DiaryDetailPage from "../features/diary/pages/DiaryDetailPage";
import DiaryWritePage from "../features/diary/pages/DiaryWritePage";
import DiaryPostSubmitPage from "../features/diary/pages/DiaryPostSubmitPage";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import SetNicknamePage from "../features/user/pages/SetNicknamePage";
import ProfilePage from "../features/user/pages/ProfilePage";
import FeedbackPage from "../features/feedback/pages/FeedbackPage";
import NotFoundPage from "../features/error/pages/NotFoundPage";
import ErrorPage from "../features/error/pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import { PATHS } from "../constants/path";

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: PATHS.HOME, element: <LandingPage /> },
      { path: PATHS.DIARY_LIST, element: <DiaryListPage /> },
      { path: PATHS.DIARY_DETAIL, element: <DiaryDetailPage /> },
      { path: PATHS.LOGIN, element: <LoginPage /> },
      { path: PATHS.SIGN_UP, element: <SignupPage /> },
      { path: PATHS.NICKNAME, element: <SetNicknamePage /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: PATHS.PROFILE, element: <ProfilePage /> }],
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [{ path: PATHS.FEEDBACK, element: <FeedbackPage /> }],
  },

  { path: PATHS.DIARY_SUBMIT, element: <DiaryPostSubmitPage /> },
  { path: PATHS.DIARY_NEW, element: <DiaryWritePage /> },
  { path: PATHS.ERROR, element: <ErrorPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
