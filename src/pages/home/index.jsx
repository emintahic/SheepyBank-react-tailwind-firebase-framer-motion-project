import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import { useShowGoals } from "../savings/hooks/useShowGoals";

import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { cFormat } from "../../utils";
import Navbar from "./components/navbarComponent";
import { CurrencyDollarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export const Home = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotal } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const { goals } = useShowGoals();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const { savingsToggle, setSavingsToggle } = useState(false);

  const { balance, income, expenses } = transactionsTotal;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });

    setDescription("");
    setTransactionAmount("");
  };

  return (
    <>
      <div className="relative z-10">
        <Navbar />
      </div>
      <motion.div
        className="h-[200%] bg-scroll pt-2 pb-6  w-full   max-h-fit text-center mt-0"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.03 } }}
      >
        {" "}
        {/* <div
          className="bg-cover"
          style={
            "backgroundImage: url('srcassets\ted-balmer-RMxqN-OCEHQ-unsplash.jpg') height:400px"
          }
        ></div> */}
        <div className="container w mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* <AddGoalFormModal /> */}
          {/* <button type="submit" onClick={navigateToSavings}>
            SAVINGS
            </button>
            <h6 className="">{name}</h6>
            <img className="profile-photo" src={profilePhoto} />
            <br />
            <button type="submit" onClick={signUserOut}>
            Sign Out
          </button> */}

          <div className=" mt-6 rounded-lg drop-shadow-sm gap-7 flex flex-col sm:flex-row items-center justify-stretch ">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              className="bg-cover  flex-grow max-w-full rounded-lg drop-shadow-sm sm:hidden inline-block relative"
              style={{ maxHeight: "270px", width: "540px" }}
            >
              <img className="rounded-lg" src="assets\irelandsheep.png" />
              <motion.dt
                initial={{ display: "none", opacity: 0 }}
                animate={{ display: "inline-block", opacity: 1 }}
                className="absolute capitalize top-7 right-24 sm:text-6xl text-3xl font-medium font-sans text-gray-50"
              >
                Hey, {name}
              </motion.dt>
              <motion.dt
                initial={{ display: "none", opacity: 0 }}
                animate={{ display: "inline-block", opacity: 1 }}
                className="absolute bottom-8 sm:right-24 right-36 text-xl  font-medium font-sans text-white"
              >
                Welcome back!
              </motion.dt>
            </motion.div>
            <div
              className="px-10 rounded-lg h-72 py-9  bg-white text-left  sm:text-right font-semibold leading-7 text-gray-900 max-h-[270px] sm:max-w-[270px] max-w-[540px] w-full relative"
              // style={{ maxHeight: "270px", maxWidth: "270px" }}
            >
              <div className="absolute  -left-2 sm:-top-2 -top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-zelena-500 animate-bounce">
                <CurrencyDollarIcon
                  className=" h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>

              <dl className="balance font-semibold leading-7 max-h-48 text-gray-900">
                <dt className=" text-3xl text-zelena-500">Your Balance: </dt>
                {balance >= 0 ? (
                  <dd className="text-2xl">{cFormat.format(balance)}</dd>
                ) : (
                  <dd className="text-red-600">{cFormat.format(balance)}</dd>
                )}{" "}
              </dl>
              <dl className="income">
                <dt className=" text-2xl">Income: </dt>
                <dd className="text-xl text-gray-600">
                  {cFormat.format(income)}
                </dd>
              </dl>
              <dl className="expenses">
                <dt className="text-2xl">Expenses: </dt>
                <dd className="text-xl text-gray-600">
                  {cFormat.format(expenses)}
                </dd>
              </dl>
            </div>
            <div
              className=" px-10  rounded-lg py-10 bg-white max-h-[270px] sm:max-w-[270px] max-w-[540px] w-full"
              // style={{ maxHeight: "270px", maxWidth: "270px" }}
            >
              <form
                className="pt-0 add-transaction flex flex-col items-center max-h-48 h-fit gap-2"
                onSubmit={onSubmit}
              >
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zelena-600 sm:text-sm sm:leading-6 "
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={transactionAmount}
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zelena-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
                <div className=" flex gap-3 items-center">
                  <input
                    type="radio"
                    id="expense"
                    value="expense"
                    className=" checked:bg-zelena-500 focus:ring-zelena-400 text-zelena-500 p-3 my-4 "
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />

                  <label
                    htmlFor="expense"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Expense
                  </label>
                  <input
                    type="radio"
                    id="income"
                    value="income"
                    className=" checked:bg-zelena-500 focus:ring-zelena-400 text-zelena-500 p-3 my-4 "
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="income">Income</label>
                </div>

                <button
                  type="submit"
                  className="shadow  bg-zelena-500 hover:bg-zelena-400 focus:shadow-outline focus:outline-none text-white font-semibold pb-1 pt-0 px-4 rounded"
                >
                  Add Transaction
                </button>
              </form>
            </div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              className="bg-cover  flex-grow max-w-full rounded-lg drop-shadow-sm sm:inline-block hidden "
              style={{ maxHeight: "270px", width: "540px" }}
            >
              <img
                className="rounded-lg h-[270px]"
                src="assets\irelandsheep.png"
              />
              <motion.dt
                initial={{ display: "none", opacity: 0 }}
                animate={{ display: "inline-block", opacity: 1 }}
                className="absolute top-7 right-24 sm:text-6xl text-4xl font-medium font-sans text-gray-50"
              >
                Hey, {name}
              </motion.dt>
              <motion.dt
                initial={{ display: "none", opacity: 0 }}
                animate={{ display: "inline-block", opacity: 1 }}
                className="absolute bottom-8 sm:right-24 right-36 text-xl  font-medium font-sans text-white"
              >
                Welcome back!
              </motion.dt>
            </motion.div>
          </div>

          <div
            className="transactions max-h-[550px]  bg-white rounded-lg my-6  px-8 py-8 grid grid-cols-3 grid-rows-2 grid-flow-col gap-6
          "
          >
            {/* from-gray-50 to-gray-100/80 */}
            <div className="row-span-2 sm:col-span-2 col-span-3 overflow-y-scroll h-[510px]  rounded-lg scrollbar-hide overscroll-contain">
              <ul className="flex flex-col gap-2  items-start    ">
                <dt className="text-xl font-medium font-sans relative text-center">
                  {" "}
                  TRANSACTIONS{" "}
                </dt>
                {transactions < 1 ? (
                  <dd className="  text-md text-gray-400 text-center mt-20 ml-64 static">
                    No transactions to show
                  </dd>
                ) : (
                  ""
                )}
                {transactions.map((transaction) => {
                  const {
                    description,
                    transactionAmount,
                    transactionType,
                    id,
                  } = transaction;
                  return (
                    <li className="bg-white border-t border-solid border-gray-200 w-full h-16 drop-shadow-none font-sans leading-6 relative ">
                      <button
                        className=" rounded-full w-6 h-6 hover:bg-gray-100 absolute right-1 top-0.5"
                        onClick={async () => {
                          await deleteDoc(doc(db, "transactions", id));
                        }}
                      >
                        <XMarkIcon className="h-6 w-6 text-gray-300" />
                      </button>
                      <dt className="capitalize font-semibold absolute text-xl left-2">
                        {" "}
                        {description}{" "}
                      </dt>
                      <dd className="text-xl font-bold absolute right-2 bottom-1">
                        {cFormat.format(transactionAmount)}{" "}
                      </dd>
                      {transactionType === "expense" ? (
                        <div className=" rounded-full bg-red-500/20 p-1 w-3.5 h-3.5 absolute left-2 bottom-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-400"></div>
                        </div>
                      ) : (
                        <div className=" rounded-full bg-zelena-500/20 p-1 w-3.5 h-3.5 absolute left-2 bottom-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-zelena-500"></div>
                        </div>
                      )}
                      {transactionType === "expense" ? (
                        <label className="uppercase absolute left-7 bottom-1 text-red-400">
                          {transactionType}
                        </label>
                      ) : (
                        <label className="uppercase absolute left-7 bottom-1 text-zelena-500">
                          {transactionType}
                        </label>
                      )}
                      {/* <label
                      className="uppercase absolute left-7 bottom-1"
                      style={{
                        color: transactionType === "expense" ? "red" : "zelena",
                      }}
                      >
                      {" "}
                      {transactionType}{" "}
                    </label> */}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className=" col-span-1 sm:inline-block rounded-md hidden">
              {goals.slice(0, 2).map((goal) => {
                const { savingsName, finalAmount, currentAmount, id } = goal;
                let numberCurrentAmount = Number(currentAmount);
                let numberFinalAmount = Number(finalAmount);

                const percentage =
                  (numberCurrentAmount / numberFinalAmount) * 100;

                return (
                  <>
                    <div className="pt-4 pb-4 ml-12 ">
                      <div
                        className="radial-progress text-gray-500 "
                        style={{
                          "--value": "100",
                          "--size": "8.5rem",
                          "--thickness": "2px",
                        }}
                      >
                        {" "}
                        <div
                          className="radial-progress text-gray-500 text-2xl"
                          style={{
                            "--value": "100",
                            "--size": "12rem",
                            "--thickness": "2px",
                          }}
                        >
                          <div
                            className="radial-progress text-zelena-600 z-10 "
                            style={{
                              "--value": percentage,
                              "--size": "12rem",
                              "--thickness": "2rem",
                            }}
                          >
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <dt className="my-8 text-lg capitalize">
                        Saved ${numberCurrentAmount} for {savingsName}
                      </dt>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
