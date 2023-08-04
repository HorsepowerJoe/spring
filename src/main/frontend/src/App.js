import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import JoinForm from "./Sign/JoinForm";
import LoginForm from "./Sign/LoginForm";

function App() {
  const navi = useNavigate();
  const [customerData, setCustomerData] = useState("");

  return (
    <div>
      <Header customerData={customerData} navi={navi}></Header>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/join" element={<JoinForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
