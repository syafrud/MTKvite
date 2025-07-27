import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import Toast from "./Toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const location = useLocation();
  const [isSurveysRoute, setIsSurveysRoute] = useState(
    location.pathname === "/surveys"
  );
  const navigate = useNavigate();

  useEffect(() => {
    setIsSurveysRoute(location.pathname === "/surveys");
  }, [location.pathname]);

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "Surveys", to: "/surveys", current: false },
    { name: "Exercise", to: "/exercise", current: false },
  ];

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
      navigate("/login"); // Redirect ke halaman /login
    });
  };

  useEffect(() => {
    axiosClient.get("/me").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Disclosure
          as="nav"
          className={
            isSurveysRoute
              ? "bg-[#87CEEB]"
              : /^\/video\//.test(window.location.pathname)
              ? "bg-[#383838] text-white"
              : "bg-[#FFFFFF]"
          }
        >
          {({ open }) => (
            <>
              <div className="mx-auto  w-screen px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex justify-between items-center flex-row">
                      <img
                        className="h-12 w-12"
                        src="../../src/assets/img/logo.png"
                        alt="Your Company"
                      />
                      <p className="font-bold ">MatikaKu</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={`font-bold text-gray-700 px-3 py-2 text-lg rounded-full ${
                              window.location.pathname === "/surveys"
                                ? "hover:bg-[#6BB9F0]"
                                : /^\/video\//.test(window.location.pathname)
                                ? " text-white"
                                : "hover:bg-[#87CEEB]"
                            }`}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-4 focus:ring-[#6BB9F0] focus:ring-offset-2 focus:ring-offset-[#87CEEB]">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <UserIcon
                              className={`w-10 h-10  p-2 rounded-full  ${
                                /^\/video\//.test(window.location.pathname)
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={(ev) => logout(ev)}
                                className={`block px-4 py-2 text-sm  ${
                                  window.location.pathname === "/surveys"
                                    ? "hover:bg-[#6BB9F0] text-gray-700"
                                    : "hover:bg-[#87CEEB] text-gray-700"
                                }`}
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-[#87CEEB] p-2 text-gray-700 hover:bg-[#87CEEB] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#6BB9F0]">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={`block rounded-md px-3 py-2 text-base font-medium ${
                        window.location.pathname === "/"
                          ? "bg-white text-gray-700"
                          : "hover:bg-[#6BB9F0] bg-white text-gray-700"
                      }`}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <UserIcon className="w-8 h-8 bg-[#6BB9F0] p-2 rounded-full text-gray-700" />

                    <div className="ml-3">
                      <div
                        className={`text-base font-medium leading-none text-gray-700  ${
                          /^\/video\//.test(window.location.pathname)
                            ? "text-white"
                            : "text-gray-700"
                        } `}
                      >
                        {currentUser.name}
                      </div>
                      <div
                        className={`text-sm font-medium leading-none text-gray-700  ${
                          /^\/video\//.test(window.location.pathname)
                            ? "text-white"
                            : "text-gray-700"
                        } `}
                      >
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(ev) => logout(ev)}
                      className={`block rounded-md px-3 py-2 text-base font-medium  hover:bg-[#6BB9F0] hover:text-gray-700 ${
                        /^\/video\//.test(window.location.pathname)
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Outlet />

        <Toast />
      </div>
    </>
  );
}
