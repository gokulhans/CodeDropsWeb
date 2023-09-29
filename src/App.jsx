import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import AddDrop from "./pages/Forms/AddDrop/AddDrop";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <div className="flex flex-col justify-start min-h-fit sm:items-center sm:p-5 bg-green-100">
        <Routes>
          {!isAuth ? (
            <>
              <Route path="*" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Home />} />
              <Route path="/add" element={<AddDrop />} />
              <Route path="*" element={<h1>Error Page</h1>} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
