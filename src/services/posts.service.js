import firebase from "firebase";
import { db } from "../firebase";

export const getPosts = async () => {
  const posts = await db
    .collection("posts")
    .orderBy("timestamp", "desc")
    .get()
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

  return posts;
};

export const createPost = async ({
  name,
  lastName,
  description,
  photoURL,
  message,
  uid,
  inputPhoto,
}) => {
  await db.collection("posts").add({
    name,
    lastName,
    description,
    photoURL,
    inputPhoto,
    userId: uid,
    message,
    liked: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const getPostComments = async (id) => {
  const comments = await db
    .collection("posts")
    .doc(id)
    .collection("comments")
    .orderBy("timestamp", "desc")
    .get()
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  return comments;
};

export const newComment = async (data) => {
  const { commentInput, name, lastName, description, photoURL, uid } = data;
  await db.collection("posts").doc(uid).collection("comments").add({
    name,
    lastName,
    description,
    photoURL,
    userId: uid,
    message: commentInput,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
