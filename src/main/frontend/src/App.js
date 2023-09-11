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
import GroomerIntro from "./intro/Intro";
import HotelIntro from "./intro/Intro";
import HandlerIntro from "./intro/Intro";
import AddPet from "./pet/AddPet";
import MyPet from "./pet/MyPet";
import axios from "axios";
import Reservation from "./reservation/Reservation";
import FindReservation from "./reservation/FindReservation";
import GroomingQna from "./qna/GroomingQna";
import GroomingQnaDetails from "./qna/GroomingQnaDetails";
import GroomingqnaForm from "./qna/GroomingQnaForm";
import HotelQna from "./qna/HotelQna";
import HotelQnaDetails from "./qna/HotelQnaDetails";
import HotelqnaForm from "./qna/HotelQnaForm";
import FacebookFeed from "./FacebookFeed";
import AdminPage from "./admin/AdminPage.tsx";
import ModifyIntroForm from "./admin/ModifyIntroForm.tsx";

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
    const body = {
      jwtToken: localStorage.getItem("jwtToken").replace("Bearer ", ""),
      refreshToken: localStorage.getItem("refreshToken"),
    };

    console.log(
      new Date().toISOString(),
      "tokenRefresh 실행!! AccessToken : " + body.jwtToken
    );
    axios.post("/oauth/jwt/refresh", body, axiosConfig).then((data) => {
      localStorage.setItem("jwtToken", "Bearer " + data.data.jwtToken);
      console.log(
        new Date().toISOString(),
        "tokenRefresh 갱신 완료! AccessToken : " + data.data.jwtToken
      );
    });
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken") !== null) {
      tokenRefresh();
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
        <Route path="/" element={<FacebookFeed />} />
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
            localStorage.getItem("userInfo") ? (
              <MyPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                navi={navi}
              ></MyPage>
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route path="/intro" element={<Intro navi={navi}></Intro>} />
        <Route
          path="/intro/handler"
          element={<HandlerIntro navi={navi}></HandlerIntro>}
        />
        <Route
          path="/intro/groomer"
          element={<GroomerIntro navi={navi}></GroomerIntro>}
        />
        <Route
          path="/intro/hotel"
          element={<HotelIntro navi={navi}></HotelIntro>}
        />
        <Route
          path="/addpet"
          element={
            localStorage.getItem("userInfo") ? (
              <AddPet navi={navi}></AddPet>
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/myPet"
          element={
            localStorage.getItem("userInfo") ? (
              <MyPet navi={navi}></MyPet>
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/reservation"
          element={
            localStorage.getItem("userInfo") ? (
              <Reservation
                navi={navi}
                axiosConfig={axiosConfig}
                userInfo={userInfo}
              ></Reservation>
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/findReservation"
          element={
            localStorage.getItem("userInfo") ? (
              <FindReservation navi={navi} axiosConfig={axiosConfig} />
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/groomingQna"
          element={
            <GroomingQna navi={navi} axiosConfig={axiosConfig}></GroomingQna>
          }
        />
        <Route
          path="/hotelQna"
          element={<HotelQna navi={navi} axiosConfig={axiosConfig}></HotelQna>}
        />
        <Route
          path="/groomingQna/:groomingQnaNum"
          element={
            <GroomingQnaDetails
              navi={navi}
              axiosConfig={axiosConfig}
            ></GroomingQnaDetails>
          }
        />
        <Route
          path="/hotelQna/:hotelQnaNum"
          element={
            <HotelQnaDetails
              navi={navi}
              axiosConfig={axiosConfig}
            ></HotelQnaDetails>
          }
        />
        <Route
          path="/groomingqnaForm"
          element={
            localStorage.getItem("userInfo") ? (
              <GroomingqnaForm
                navi={navi}
                axiosConfig={axiosConfig}
              ></GroomingqnaForm>
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/hotelQnaForm"
          element={
            localStorage.getItem("userInfo") ? (
              <HotelqnaForm
                navi={navi}
                axiosConfig={axiosConfig}
              ></HotelqnaForm>
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/admin"
          element={
            localStorage.getItem("userInfo") ? (
              <AdminPage
                navi={navi}
                userInfo={userInfo}
                axiosConfig={axiosConfig}
                getToken={getToken}
              />
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
        <Route
          path="/admin/modifyIntroFrom"
          element={
            localStorage.getItem("userInfo") ? (
              <ModifyIntroForm
                navi={navi}
                userInfo={userInfo}
                axiosConfig={axiosConfig}
                getToken={getToken}
              />
            ) : (
              <LoginForm
                navi={navi}
                setGetToken={setGetToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                getToken={getToken}
                tokenRefresh={tokenRefresh}
                setIsLogined={setIsLogined}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
