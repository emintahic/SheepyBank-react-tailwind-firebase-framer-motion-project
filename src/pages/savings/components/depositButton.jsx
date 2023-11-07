import useToggle from "../../../hooks/useToggle";
import DepositModal from "./depositModal";

export default function depositButton({ numberCurrentAmount, goalId }) {
  const [toggle, setToggle] = useToggle(false);
  return (
    <>
      <button
        type="submit"
        className="w-[90px] inline-flex  justify-center rounded-md bg-zelena-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zelena-800 sm:ml-3 sm:w-[90px]"
        onClick={setToggle}
      >
        ADD
      </button>
      {toggle ? (
        <DepositModal
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
