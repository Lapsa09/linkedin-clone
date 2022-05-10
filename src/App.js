import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { login, logout, selectUser } from "./features/userSlice";
import { Homepage, Login, Profile, Register } from "./pages";
import { verify } from "./services/user.service";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const res = verify();
    if (res) {
      dispatch(login(res));
    } else {
      dispatch(logout());
    }
  }, []);

  return (
    <BrowserRouter>
      {user && <Header />}
      <Routes>
        <Route
          exact
          path="/"
          element={() => (user ? <Homepage /> : <Navigate to="/login" />)}
        />
        <Route
          path="/login"
          element={() => (!user ? <Login /> : <Navigate to="/" />)}
        />
        <Route
          path="/register"
          element={() => (!user ? <Register /> : <Navigate to="/" />)}
        />
        <Route
          path="/profile"
          element={() => (!user ? <Navigate to="login" /> : <Profile />)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
