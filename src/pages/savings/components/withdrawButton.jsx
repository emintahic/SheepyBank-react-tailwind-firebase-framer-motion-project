import useToggle from "../../../hooks/useToggle";
import WithdrawModal from "./withdrawModal";

export default function depositButton({ numberCurrentAmount, goalId }) {
  const [toggle, setToggle] = useToggle(false);
  return (
    <>
      <button
        type="submit"
        className="inline-flex w-[90px] justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:ml-3 sm:w-[90px]"
        onClick={setToggle}
      >
        WITHDRAW
      </button>
      {toggle ? (
        <WithdrawModal
          numberCurrentAmount={numberCurrentAmount}
          toggleAdd={setToggle}
          goalId={goalId}
        />
      ) : (
        ""
      )}
    </>
  );
}
