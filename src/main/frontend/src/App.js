import ChooseIntro from "admin/ChooseIntro";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import FacebookFeed from "./FacebookFeed";
import Header from "./Header";
import AdminPage from "./admin/AdminPage.tsx";
import ModifyIntroForm from "./admin/ModifyIntroForm.tsx";
import Intro from "./intro/Intro";
import AddPet from "./pet/AddPet";
import MyPet from "./pet/MyPet";
import GroomingQna from "./qna/GroomingQna";
import GroomingQnaDetails from "./qna/GroomingQnaDetails";
import GroomingqnaForm from "./qna/GroomingQnaForm";
import HotelQna from "./qna/HotelQna";
import HotelQnaDetails from "./qna/HotelQnaDetails";
import HotelqnaForm from "./qna/HotelQnaForm";
import FindReservation from "./reservation/FindReservation";
import Reservation from "./reservation/Reservation";
import JoinForm from "./sign/JoinForm";
import LoginForm from "./sign/LoginForm";
import NaverLoginSuccessed from "./sign/NaverLoginSuccessed";
import MyPage from "./user/MyPage";
import UpdateQnaForm from "qna/UpdateQnaForm";
import ReservationList from "admin/ReservationList";
import UserList from "admin/UserList";

function App() {
  const navi = useNavigate();
  const [getToken, setGetToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const location = useLocation();
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

    console.log(new Date().toISOString(), "tokenRefresh 실행!!");
    axios
      .post("/oauth/jwt/refresh", body)
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("jwtToken", "Bearer " + data.data.jwtToken);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(jwtDecode(data.data.jwtToken))
          );
          console.log(new Date().toISOString(), "tokenRefresh 갱신 완료!");
        } else {
          localStorage.removeItem("jwtToken");
          setUserInfo("");
          let copy = isLogined;
          setIsLogined(!copy);
        }
      })
      .catch((er) => {
        alert("만료된 인증입니다.");
        axios
          .post(
            "/api/logout",
            {
              jwtToken: localStorage.getItem("jwtToken"),
              refreshToken: localStorage.getItem("refreshToken"),
            },
            axiosConfig
          )
          .then((data) => {
            if (data.status == 200) {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("refreshToken");
              setUserInfo("");
              setIsLogined(false);
              clearInterval(tokenRefresh);
              navi("/loginForm");
            }
          });
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
      if (
        location.pathname !== "/user/mypage" &&
        JSON.parse(localStorage.getItem("userInfo")).extraData == false
      ) {
        alert("추가 정보 입력이 필요합니다.");
        navi("/user/mypage");
      }
    }
  }, [location]);

  return (
    <div>
      <Header
        userInfo={userInfo}
        navi={navi}
        setUserInfo={setUserInfo}
        axiosConfig={axiosConfig}
        setIsLogined={setIsLogined}
        tokenRefresh={tokenRefresh}
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
          path="/user/mypage"
          element={
            localStorage.getItem("userInfo") ? (
              <MyPage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                navi={navi}
                tokenRefresh={tokenRefresh}
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
        <Route path="/intro/:category" element={<Intro navi={navi}></Intro>} />
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
            localStorage.getItem("userInfo") ? (
              <GroomingQna navi={navi} axiosConfig={axiosConfig}></GroomingQna>
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
          path="/hotelQna"
          element={
            localStorage.getItem("userInfo") ? (
              <HotelQna navi={navi} axiosConfig={axiosConfig}></HotelQna>
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
          path="/UpdateQnaForm/:category/:num"
          element={
            localStorage.getItem("userInfo") ? (
              <UpdateQnaForm
                navi={navi}
                axiosConfig={axiosConfig}
              ></UpdateQnaForm>
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
            JSON.parse(localStorage.getItem("userInfo"))?.role ==
            "ROLE_ADMIN" ? (
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
            JSON.parse(localStorage.getItem("userInfo"))?.role ==
            "ROLE_ADMIN" ? (
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
        <Route
          path="/admin/chooseIntro"
          element={
            JSON.parse(localStorage.getItem("userInfo"))?.role ==
            "ROLE_ADMIN" ? (
              <ChooseIntro
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
          path="/admin/reservationList"
          element={
            JSON.parse(localStorage.getItem("userInfo"))?.role ==
            "ROLE_ADMIN" ? (
              <ReservationList
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
          path="/admin/userList"
          element={
            JSON.parse(localStorage.getItem("userInfo"))?.role ==
            "ROLE_ADMIN" ? (
              <UserList
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
