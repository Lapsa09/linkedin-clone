import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { login, logout, selectUser } from "./features/userSlice";
import { auth, getUserData } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
  return (
    <div className="App">
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
          <Route path="/profile" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
