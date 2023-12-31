import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddGoal } from "../hooks/useAddGoal";
import { AnimatePresence, motion } from "framer-motion";

export default function addGoalFormModal({ toggleAdd }) {
  const { addGoal } = useAddGoal();
  const [open, setOpen] = useState(true);

  const [savingsName, setSavingsName] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const cancelButtonRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    addGoal({ savingsName, finalAmount, currentAmount });
    toggleAdd();

    setCurrentAmount("");
    setFinalAmount("");
    setSavingsName("");
  };

  return (
    <AnimatePresence>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          // initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen;
            toggleAdd();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: "easeIn",
                  duration: 0.15,
                },
              }}
              className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={onSubmit} className="mt-2 mr-2">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10">
                          <PlusIcon
                            className="h-6 w-6 text-zelena-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Create a New Goal
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Type the name of the goal, the amount you need to
                              achieve it and amount you already saved:
                            </p>
                          </div>
                          <div className="mt-2 flex flex-col gap-2 relative rounded-md shadow-sm">
                            <input
                              required
                              type="text"
                              placeholder="Name"
                              value={savingsName}
                              onChange={(e) => setSavingsName(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-zelena-600 sm:text-sm sm:leading-6 outline-none border-none"
                            />
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-zelena-600 sm:max-w-md">
                              <span className="absolute bottom-[50px] sm:bottom-[52px] -left-[2px] select-none items-center pl-2 text-gray-500 sm:text-sm">
                                $
                              </span>
                              <input
                                required
                                type="number"
                                placeholder="Amount needed"
                                value={finalAmount}
                                onChange={(e) => setFinalAmount(e.target.value)}
                                className="[&::-webkit-inner-spin-button]:appearance-none pl-4 block flex-1 border-0 ring-1 ring-inset ring-gray-300 rounded-md bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-zelena-600 sm:text-sm sm:leading-6 outline-none border-none"
                              />
                            </div>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-zelena-600 sm:max-w-md">
                              <span className="absolute bottom-[6px] sm:bottom-[8px] -left-[2px] select-none items-center pl-2 text-gray-500 sm:text-sm">
                                $
                              </span>
                              <input
                                type="number"
                                placeholder="Amount saved"
                                value={currentAmount}
                                onChange={(e) =>
                                  setCurrentAmount(e.target.value)
                                }
                                className="[&::-webkit-inner-spin-button]:appearance-none pl-4 block flex-1 border-0 bg-transparent py-1.5 ring-1 ring-gray-300 ring-inset text-gray-900 placeholder:text-gray-400 rounded-md focus:ring-1 focus:ring-zelena-600 sm:text-sm sm:leading-6 outline-none border-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-zelena-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zelena-600 sm:ml-3 sm:w-auto"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </motion.div>
          </div>
        </Dialog>
      </Transition.Root>
    </AnimatePresence>
  );
}
