import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBLpRQemNZjYXFnQpPTB926G5LFEIe4lMA",
  authDomain: "linkedin-clone-7e041.firebaseapp.com",
  projectId: "linkedin-clone-7e041",
  storageBucket: "linkedin-clone-7e041.appspot.com",
  messagingSenderId: "278456816099",
  appId: "1:278456816099:web:ad02b412586e1c02c390d6",
  measurementId: "G-N0706JYF0V",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

const db = firebaseApp.firestore();

const store = firebaseApp.storage();

const getUserData = async (email) => {
  const query = await db.collection("users").where("email", "==", email).get();
  const queryData = query.docs[0].data();
  return queryData;
};

const getUserId = async (email) => {
  const query = await db.collection("users").where("email", "==", email).get();
  const queryData = query.docs[0].id;
  return queryData;
};

const getPostsById = async (id) => {
  const query = await db.collection("posts").where("userId", "==", id).get();
  const queryData = query.docs.map((post) => post.id);
  return queryData;
};

export { auth, db, store, getUserData, getUserId, getPostsById };
