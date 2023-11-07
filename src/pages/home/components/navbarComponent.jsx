import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { useNavigate } from "react-router-dom";
const { name, profilePhoto, email } = useGetUserInfo();
const navigation = [{ name: "Home", href: "/home", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function navbarComponent() {
  const navigate = useNavigate();
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const navToHome = () => {
    navigate("/home");
  };

  const navToSavings = () => {
    navigate("/savings");
  };

  return (
    <Disclosure as="nav" className="bg-white drop-shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                {/* <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button> */}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start drop-shadow-2xl">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-16 w-auto my-2 cursor-pointer"
                    src="src/assets/SHEEPYBANK_slim.png"
                    alt="SheepyBank"
                    onClick={navToHome}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  {/* <div className="flex space-x-4 mt-3">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "text-gray-900"
                            : "text-gray-300 hover:text-gray-950",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div> */}
                </div>
              </div>

              <button
                type="submit"
                onClick={navToSavings}
                className=" bg-zelena-500 rounded-md py-2 px-2 text-gray-100 hover:bg-zelena-600 drop-shadow-md"
              >
                Savings
              </button>

              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute -top-4 right-3/4 inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex -top-4 right-3/4 rounded-full h-3 w-3 bg-red-500"></span>
              </span>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm outline-none ring-2 ring-zelena-500 ring-offset-2 ring-offset-white">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={profilePhoto}
                        alt=""
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
                    <Menu.Items className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white pb-0 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              "bg-white",
                              "block px-4 py-2 text-sm text-gray-900 rounded-md "
                            )}
                          >
                            {name}
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signUserOut}
                            className={classNames(
                              active
                                ? "bg-red-400 rounded-md text-gray-50"
                                : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer bg-zelena-300 hover:bg-red-400 hover:text-gray-50 rounded-md"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
