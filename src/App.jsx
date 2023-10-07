import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import AddDrop from "./pages/Forms/AddDrop/AddDrop";
import EditDrop from "./pages/Forms/EditDrop/EditDrop";
import ViewDrop from "./pages/ViewDrop/ViewDrop";
import MyProfile from "./pages/MyProfile/MyProfile";
import Tag from "./pages/Tag/Tag";
import Profile from "./pages/Profile/Profile";
import './App.css'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <div className="flex flex-col justify-start min-h-fit sm:items-center sm:p-5 bg-green-50 min-h-screen mt-16">
        <Routes>
          {!isAuth ? (
            <>
              <Route path="*" element={<Login setIsAuth={setIsAuth} />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Home />} />
              <Route path="/add" element={<AddDrop />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route
                path="/profile/:authorid/:authorname"
                element={<Profile />}
              />
              <Route path="/tag/:tag" element={<Tag />} />
              <Route path="/edit/:id" element={<EditDrop />} />
              <Route path="/drop/:id/:drop" element={<ViewDrop />} />
              <Route path="*" element={<h1>Error Page</h1>} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
