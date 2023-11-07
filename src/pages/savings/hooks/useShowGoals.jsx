import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { useEffect, useState } from "react";
import { useGetUserInfo } from "../../../hooks/useGetUserInfo";

export const useShowGoals = () => {
  const [goals, setGoals] = useState([]);

  const savingsCollectionRef = collection(db, "savings");
  const { userID } = useGetUserInfo();

  const showGoals = async () => {
    try {
      const queryGoals = query(
        savingsCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      const unsub = onSnapshot(queryGoals, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setGoals(docs);
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsub();
  };

  useEffect(() => {
    showGoals();
  }, []);
  return { goals };
};
