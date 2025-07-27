import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();
  if (userToken) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-[360px]  bg-[#A1CEE0]">
      <Outlet />
    </div>
  );
}
