import { auth, db } from "../firebase";

export const newDegree = async (data) => {
  const {
    univLogo,
    univ,
    deg,
    years: [start, end],
    uid,
  } = data;
  await db.collection("users").doc(uid).collection("education").add({
    universityLogo: univLogo,
    university: univ,
    degree: deg,
    start,
    end,
  });
};

export const editDegree = async (data) => {
  const {
    univLogo,
    univ,
    deg,
    years: [start, end],
    uid,
    id,
  } = data;
  await db.collection("users").doc(uid).collection("education").doc(id).update({
    universityLogo: univLogo,
    university: univ,
    degree: deg,
    start,
    end,
  });
};

export const getUserData = async (uid) => {
  const doc = await db.collection("users").doc(uid).get().data();

  return {
    name: doc.name,
    lastName: doc.lastName,
    description: doc.description,
  };
};

export const updateUserData = async ({
  firstName,
  lastName,
  uid,
  description,
}) => {
  await auth.currentUser().updateProfile({
    displayName: `${firstName} ${lastName}`,
  });
  await db.collection("users").doc(uid).update({
    name: firstName,
    lastName,
    description,
  });
};

export const newSkill = async ({ userId, skill }) => {
  await db.collection("users").doc(userId).collection("skills").add({
    skill,
  });
};
