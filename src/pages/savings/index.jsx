import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { json, useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAddGoal } from "./hooks/useAddGoal";
import { useState } from "react";
import { useShowGoals } from "./hooks/useShowGoals";
import AddGoalFormModal from "./components/addGoalFormModal";
import useToggle from "../../hooks/useToggle";
import DepositButton from "./components/depositButton";
import WithdrawButton from "./components/withdrawButton";
import Navbar from "../home/components/navbarComponent";
import { AnimatePresence, motion } from "framer-motion";
import { cFormat } from "../../utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const Savings = () => {
  const { goals } = useShowGoals();
  // const { addGoal } = useAddGoal();
  const [savingsName, setSavingsName] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const { savingsToggle, setSavingsToggle } = useState(false);
  const [toggle, setToggle] = useToggle(false);

  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  let base = 4;
  let t = (d) => d * base;

  const navigateToSavings = () => {
    navigate("/savings");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const heading =
    '"One of the reasons people don’t reach their savings goals is because they’re unable to quantify them!" '.split(
      " "
    );

  return (
    <>
      <div className="relative z-10">
        <Navbar />
      </div>
      <motion.div
        className="h-[200%] pt-2 pb-6  relative  w-full  max-h-fit text-center mt-0"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.03 } }}
      >
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center mt-0">
          <div className="my-6 font-serif font-light text-2xl max-w-[800px] mx-auto text-gray-700">
            {heading.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i / 6,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-between h-9 max-w-[800px] w-100% bg-white drop-shadow-sm rounded-3xl mx-auto">
            <dt className="ml-3 py-1 font-normal text-gray-700">
              Click the + button and create a new savings goal now!{" "}
            </dt>
            <button
              className=" w-[90px] justify-center rounded-3xl bg-zelena-400 px-0 py-0 text-xl font-semibold text-white shadow-sm hover:bg-zelena-800  sm:w-[150px]"
              type="submit"
              onClick={setToggle}
            >
              +
            </button>
          </div>
          <div className=" rounded-lg py-5">
            {toggle ? (
              <AddGoalFormModal
                savingsName={savingsName}
                currentAmount={currentAmount}
                finalAmount={finalAmount}
                toggleAdd={setToggle}
              />
            ) : (
              ""
            )}

            <div className="max-w-[800px] mx-auto overflow-y-scroll sm:h-[500px] md:h-[650px] lg:h-[750px] rounded-lg scrollbar-hide overscroll-contain">
              <AnimatePresence initial={false}>
                {goals.map((goal) => {
                  const { savingsName, finalAmount, currentAmount, id } = goal;
                  let numberCurrentAmount = Number(currentAmount);
                  let numberFinalAmount = Number(finalAmount);

                  const percentage =
                    (numberCurrentAmount / numberFinalAmount) * 100;
                  return (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "130px",
                        opacity: 1,
                        transition: {
                          type: "spring",
                          bounce: 0.3,
                          opacity: { delay: t(0.025) },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: t(0.15),
                        type: "spring",
                        bounce: 0,
                        opacity: { duration: t(0.03) },
                      }}
                      className=" my-5 bg-white rounded-lg px-2 py-2 drop-shadow-sm"
                    >
                      <button
                        className=" rounded-full w-6 h-6 hover:bg-gray-100 absolute right-[10px]  "
                        onClick={async () => {
                          await deleteDoc(doc(db, "savings", id));
                        }}
                      >
                        <XMarkIcon className="h-6 w-6 text-gray-300" />
                      </button>
                      <dt className="text-zelena-900 text-xl capitalize mb-2">
                        {savingsName}
                      </dt>
                      <div className="h-4 w-100% bg-gray-300 rounded-xl mx-10">
                        <motion.div
                          initial={{ width: "0vw" }}
                          animate={{ width: `${percentage.toFixed(1)}%` }}
                          transition={{ duration: 1, origin: 1 }}
                          className="h-4 bg-zelena-500 rounded-xl max-w-full"
                          style={{ width: `${percentage.toFixed(1)}%` }}
                        ></motion.div>
                      </div>
                      <div className="h-6">
                        <dd className="text-left pl-10 text-base font-sans font-thin text-gray-900">
                          Saved: {cFormat.format(currentAmount)} /{" "}
                          {cFormat.format(finalAmount)}
                        </dd>
                        <dd className="text-right right-12 bottom-11 absolute text-base font-sans font-thin text-gray-900">
                          {percentage.toFixed(1)}%
                        </dd>
                      </div>

                      <DepositButton
                        numberCurrentAmount={numberCurrentAmount}
                        goalId={id}
                      />
                      <WithdrawButton
                        numberCurrentAmount={numberCurrentAmount}
                        goalId={id}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
