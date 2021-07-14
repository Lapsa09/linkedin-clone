import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Register from "./components/register/Register";
import { useResize } from "./features/useResize";
import { login, logout, selectUser } from "./features/userSlice";
import { auth, getUserData } from "./firebase";
import { setWidth } from "./features/widthSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const myRef = useRef(null);
  const initWidth = window.innerWidth;
  const { width } = useResize(myRef, initWidth);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        getUserData(userAuth.email).then((doc) => {
          dispatch(
            login({
              name: doc.name,
              lastName: doc.lastName,
              uid: userAuth.uid,
              email: doc.email,
              description: doc.description,
              photoURL: doc.profilePic,
            })
          );
        });
      } else {
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setWidth({ width }));
  }, [width]);
  return (
    <div ref={myRef} className="App">
      <BrowserRouter>
        {user && <Header />}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (user ? <Homepage /> : <Redirect to="/login" />)}
          />
          <Route
            path="/login"
            render={() => (!user ? <Login /> : <Redirect to="/" />)}
          />
          <Route
            path="/register"
            render={() => (!user ? <Register /> : <Redirect to="/" />)}
          />
          <Route
            path="/profile"
            render={() => (!user ? <Redirect to="login" /> : <Profile />)}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
