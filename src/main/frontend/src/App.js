import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import JoinForm from "./sign/JoinForm";
import LoginForm from "./sign/LoginForm";
import NaverLoginSuccessed from "./sign/NaverLoginSuccessed";
import ExtraJoin from "./sign/ExtraJoin";
import MyPage from "./user/MyPage";

function App() {
  const navi = useNavigate();
  const [getToken, setGetToken] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userInfo") !== null) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  return (
    <div>
      <Header
        userInfo={userInfo}
        navi={navi}
        setUserInfo={setUserInfo}
      ></Header>
      <Routes>
        <Route
          path="/loginForm"
          element={
            <LoginForm
              navi={navi}
              setGetToken={setGetToken}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
              getToken={getToken}
            />
          }
        ></Route>
        <Route path="/joinForm" element={<JoinForm navi={navi} />}></Route>
        <Route
          path="/naverLoginSuccessed/"
          element={
            <NaverLoginSuccessed
              navi={navi}
              setGetToken={setGetToken}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
              getToken={getToken}
            />
          }
        ></Route>
        <Route
          path="/extraJoin"
          element={
            <ExtraJoin
              navi={navi}
              userInfo={userInfo}
              getToken={getToken}
            ></ExtraJoin>
          }
        />
        <Route
          path="/user/mypage"
          element={
            <MyPage
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              navi={navi}
            ></MyPage>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
