import { Avatar, Button } from "flowbite-react";
import {
  Bell,
  KeyRound,
  LogOut,
} from "lucide-react";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { useUserStore } from "@/store/user.store";
import { NavLink } from "react-router-dom";

export const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { access, avatar, name, last_name, email, role } = useUserStore();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const urlImages = "http://www.localhost:8000/media/";

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-happyblue-600 bg-opacity-75 backdrop-blur-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/home">
            <h1 className=" text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-happyblue-300 to-happyblue-100">
              Smalltube
            </h1>
          </NavLink>
          <div className="flex items-center space-x-4">
            {access !== "" ? (
              <Button
                color="gray"
                size="sm"
                className="hidden md:flex lg:flex xl:flex !bg-transparent hover:!bg-happyblue-800 rounded-md"
              >
                <Bell className="text-happyblue-300 hover:text-happyblue-100 rounded-md" />
              </Button>
            ) : null}

            {access !== "" ? (
              <img
                src={`${urlImages}${avatar}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-happyblue-300 cursor-pointer"
                onClick={toggleDrawer}
              />
            ) : (
              <NavLink to="/auth">
                <button className="flex md:flex lg:flex xl:flex px-6 py-2 bg-happyblue-200 text-white font-semibold rounded-full hover:bg-happyblue-600 focus:ring-2 focus:ring-happyblue-300 transition duration-200">
                  <KeyRound />
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Drawer */}
      <Drawer open={isOpen} onClose={toggleDrawer}>
        <div className="flex flex-col h-full">

          <div className="flex flex-col items-center text-white p-6 w-72 rounded-lg">
            <Avatar
              img={`${urlImages}${avatar}`}
              alt={name}
              rounded={true}
              className="mb-4"
              size="xl"
            />
            <h2 className="text-xl text-black font-semibold">{name} {last_name}</h2>
            <p className="text-sm text-gray-400 mb-4">{email}</p>

            <Button className="w-full" color="failure" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          <hr />
          <div className="py-4 overflow-y-auto flex-grow">
            <ul className="space-y-2 font-medium">
              <li>
                {role.includes('admin') ? (
                  <NavLink to="/create-video" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd" />
                    </svg>


                    <span className="flex-1 ms-3 whitespace-nowrap">Upload</span>
                  </NavLink>
                ) : ("")}
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clip-rule="evenodd" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Likes</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">History</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto py-4 px-6 text-center bg-gray-250 dark:bg-gray-700">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-happyblue-400 to-happyblue-200">
              Smalltube
            </h1>
          </div>
        </div>
      </Drawer>
    </>
  );
};
