import { auth, db, getPostsById } from "../firebase";
import { uploadImg } from ".";

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

export const changeProfilePic = async (uid, e) => {
  const { link } = uploadImg(uid, e);

  await auth.currentUser.updateProfile({
    photoURL: link,
  });
  await db.collection("users").doc(uid).update({
    profilePic: link,
  });
  await getPostsById(uid).then((posts) => {
    posts.forEach((post) => {
      db.collection("posts").doc(post).update({
        photoURL: link,
      });
    });
  });
  return link;
};

export const getSkills = async (uid) => {
  const skills = await db
    .collection("users")
    .doc(uid)
    .collection("skills")
    .get()
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  return skills;
};
