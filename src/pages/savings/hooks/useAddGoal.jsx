import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";

export const useAddGoal = () => {
  const savingsCollectionRef = collection(db, "savings");
  const { userID } = useGetUserInfo();
  const addGoal = async ({ savingsName, finalAmount, currentAmount }) => {
    await addDoc(savingsCollectionRef, {
      userID,
      savingsName,
      finalAmount,
      currentAmount,
      createdAt: serverTimestamp(),
    });
  };
  return { addGoal };
};
