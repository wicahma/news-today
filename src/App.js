import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Upload from "./pages/upload/Upload";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Register from "./pages/user/Register";
import Watch from "./pages/watch/Watch";

function App(props) {
  const location = useLocation();
  let isActive = false;

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));

    dataUser
      ? props.dispatch({ type: "SET_USER", dataUser: dataUser })
      : console.log("data tidak ada");
  }, []);

  const handleNavbar = (location) => {
    switch (location) {
      case "/login":
        isActive = false;
        return null;
      case "/register":
        isActive = false;
        return null;
      default:
        isActive = true;
        return <Navbar />;
    }
  };

  return (
    <>
      {handleNavbar(location.pathname)}
      <div
        className={`bg-white dark:bg-gray-900 min-h-screen ${
          isActive ? "pt-10" : "pt-0"
        }`}
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<Navigate to="/home" replace />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/home"
            element={<Home />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/home/:data"
            element={<Watch />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/upload"
            element={
              props.dataUser !== null ? (
                <Upload />
              ) : (
                <Navigate to="/login" replace />
              )
            }
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/login"
            element={<Login />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/register"
            element={<Register />}
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
          <Route
            path="/profile"
            element={
              props.dataUser !== null ? (
                <Profile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
            errorElement={"Keanya ada yang salah sama ketikanmu lah 🤣"}
          />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dataUser: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(App);
