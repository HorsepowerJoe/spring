import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import SignUpForm from "./Sign/SignUpForm";
import SignInForm from "./Sign/SignInForm";

function App() {
  const navi = useNavigate();
  const [customerData, setCustomerData] = useState("");

  return (
    <div>
      <Header customerData={customerData} navi={navi}></Header>
      <Routes>
        <Route path="/sign/in" element={<SignInForm />}></Route>
        <Route path="/sign/up" element={<SignUpForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
