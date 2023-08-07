import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import JoinForm from "./sign/JoinForm";
import LoginForm from "./sign/LoginForm";
import { useEffect } from "react";
import NaverLoginSuccessed from "./sign/NaverLoginSuccessed";

function App() {
  const navi = useNavigate();
  const [customerData, setCustomerData] = useState("");

  return (
    <div>
      <Header customerData={customerData} navi={navi}></Header>
      <Routes>
        <Route path="/loginForm" element={<LoginForm navi={navi} />}></Route>
        <Route path="/joinForm" element={<JoinForm navi={navi} />}></Route>
        <Route
          path="/naverLoginSuccessed/"
          element={<NaverLoginSuccessed navi={navi} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
