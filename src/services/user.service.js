import { auth, db, store } from "../firebase";

export const signUp = async (data) => {
  const { email, password, name, lastName, description } = data;
  const userAuth = await auth.createUserWithEmailAndPassword(email, password);
  await userAuth.user.updateProfile({
    displayName: `${name} ${lastName}`,
  });
  await db.collection("users").doc(userAuth.user.uid).set({
    name,
    lastName,
    description,
    email,
    profilePic: "",
  });
  const doc = await db.collection("users").doc(userAuth.user.uid).get();

  return {
    name: doc.name,
    lastName: doc.lastName,
    uid: userAuth.user.uid,
    description: doc.description,
    email: doc.email,
  };
};

export const verify = async () => {
  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const doc = await getUserData(userAuth.email);
      return {
        name: doc.name,
        lastName: doc.lastName,
        uid: userAuth.uid,
        email: doc.email,
        description: doc.description,
        photoURL: doc.profilePic,
      };
    } else {
      return null;
    }
  });
};

export const signIn = async (data) => {
  const { email, password } = data;
  const userAuth = await auth.signInWithEmailAndPassword(email, password);
  const doc = await getUserData(userAuth.user.email);

  return {
    name: doc.name,
    lastName: doc.lastName,
    uid: userAuth.user.uid,
    photoURL: doc.profilePic,
    email: doc.email,
    description: doc.description,
  };
};

export const uploadImg = async (uid, e) => {
  const file = e.target.files[0];
  const storageRef = store.ref();
  const fileRef = storageRef.child(`postPics/${uid}/${file.name}`);
  await fileRef.put(file);
  return { name: file.name, link: await fileRef.getDownloadURL() };
};
