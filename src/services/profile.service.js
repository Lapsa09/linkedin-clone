import { db } from "../firebase";

export const getDegrees = async (uid) => {
  const degrees = await db
    .collection("users")
    .doc(uid)
    .collection("education")
    .orderBy("start", "desc")
    .get()
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  return degrees;
};
