import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import JoinForm from "./sign/JoinForm";
import LoginForm from "./sign/LoginForm";
import NaverLoginSuccessed from "./sign/NaverLoginSuccessed";
import ExtraJoin from "./sign/ExtraJoin";
import MyPage from "./user/MyPage";
import Intro from "./intro/Intro";
import AddPet from "./pet/AddPet";
import MyPet from "./pet/MyPet";
import axios from "axios";
import Reservation from "./reservation/Reservation";
import FindReservation from "./reservation/FindReservation";

function App() {
  const navi = useNavigate();
  const [getToken, setGetToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const axiosConfig = {
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
  };

  const tokenRefresh = () => {
    console.log("tokenRefresh 실행!!");
    console.log("isLogined =", isLogined);
    const body = {
      jwtToken: localStorage.getItem("jwtToken").replace("Bearer ", ""),
      refreshToken: localStorage.getItem("refreshToken"),
    };
    axios.post("/oauth/jwt/refresh", body, axiosConfig).then((data) => {
      localStorage.setItem("jwtToken", "Bearer " + data.data.jwtToken);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken") !== null) {
      setInterval(tokenRefresh, 60000 * 9);
    } else {
      clearInterval(tokenRefresh);
    }
  }, [isLogined]);

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
        axiosConfig={axiosConfig}
        setIsLogined={setIsLogined}
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
              tokenRefresh={tokenRefresh}
              setIsLogined={setIsLogined}
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
              setIsLogined={setIsLogined}
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
        <Route path="/intro" element={<Intro navi={navi}></Intro>} />
        <Route path="/intro/handler" element={<Intro navi={navi}></Intro>} />
        <Route path="/intro/groomer" element={<Intro navi={navi}></Intro>} />
        <Route path="/intro/hotel" element={<Intro navi={navi}></Intro>} />
        <Route path="/addpet" element={<AddPet navi={navi}></AddPet>} />
        <Route path="/myPet" element={<MyPet navi={navi}></MyPet>} />
        <Route
          path="/reservation"
          element={
            <Reservation
              navi={navi}
              axiosConfig={axiosConfig}
              userInfo={userInfo}
            ></Reservation>
          }
        />
        <Route
          path="/findReservation"
          element={<FindReservation navi={navi} axiosConfig={axiosConfig} />}
        />
      </Routes>
    </div>
  );
}

export default App;
