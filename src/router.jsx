import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/Surveys";
import Signup from "./views/Signup";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import SurveyView from "./views/SurveyView";
import SurveyPublicView from "./views/SurveyPublicView";
import History from "./views/History";
import { useStateContext } from "./contexts/ContextProvider";
import Exercise from "./views/Exercise";
import Video from "./views/video";
import SurveyAnswer from "./views/SurveyAnswer";

const ProtectedRoute = ({ userRole, children }) => {
  const { currentUser } = useStateContext();

  if (userRole === "admin" && currentUser.role !== "admin") {
    return <Navigate to="/surveys" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/dashboard", element: <Navigate to="/" /> },
      { path: "/", element: <Dashboard /> },
      { path: "/surveys", element: <Surveys /> },
      { path: "/exercise", element: <Exercise /> },
      {
        path: "/surveys/create",
        element: (
          <ProtectedRoute userRole="admin">
            <SurveyView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/surveys/:id",
        element: (
          <ProtectedRoute userRole="admin">
            <SurveyView />
          </ProtectedRoute>
        ),
      },
      { path: "/history/:slug/:id", element: <SurveyAnswer /> },
      { path: "/history/:slug", element: <History /> },
      { path: "/video/:slug", element: <Video /> },
      { path: "/survey/public/:slug", element: <SurveyPublicView /> },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);
export default router;
