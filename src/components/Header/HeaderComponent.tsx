import { Button } from "flowbite-react";
import { Search, Bell, KeyRound } from "lucide-react";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { useUserStore } from "@/store/user.store";
import { NavLink } from "react-router-dom";

export const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { access } = useUserStore();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-happyblue-600 bg-opacity-75 backdrop-blur-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="md:flex lg:flex xl:flex hidden text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-happyblue-300 to-happyblue-100">
            Smalltube
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-64 bg-happyblue-800 border-none focus:ring-2 focus:ring-happyblue-400 text-happyblue-50 placeholder-happyblue-400 rounded-lg"
              />
              <Search
                className="absolute right-3 top-2.5 text-happyblue-400"
                size={18}
              />
            </div>
            {access !== "" ? (
              <Button
                color="gray"
                size="sm"
                className="hidden md:flex lg:flex xl:flex !bg-transparent hover:!bg-happyblue-800 rounded-md"
              >
                <Bell className="text-happyblue-300 hover:text-happyblue-100 rounded-md" />
              </Button>
            ) : null}
            <NavLink to="/auth">
              <button className="flex md:flex lg:flex xl:flex px-6 py-2 bg-happyblue-200 text-white font-semibold rounded-full hover:bg-happyblue-600 focus:ring-2 focus:ring-happyblue-300 transition duration-200">
                <KeyRound />
              </button>
            </NavLink>
            {access !== "" ? (
              <button
                onClick={toggleDrawer}
                className="flex md:hidden lg:hidden xl:hidden bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {isOpen ? "Cerrar Menú" : "Abrir Menú"}
              </button>
            ): ("")}
          </div>
        </div>
      </header>

      <Drawer open={isOpen} onClose={toggleDrawer}>
        <div className="flex flex-col h-full">
          <h5
            id="drawer-backdrop-label"
            className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            Menu
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-backdrop"
            aria-controls="drawer-backdrop"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="py-4 overflow-y-auto flex-grow">
            <ul className="space-y-2 font-medium">
              {/* Aquí van tus elementos del menú */}
            </ul>
          </div>
          <div className="mt-auto py-4 px-6 text-center bg-gray-250 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              <h1 className="lg:block xl:block hidden text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-happyblue-400 to-happyblue-200">
                Smalltube
              </h1>
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
