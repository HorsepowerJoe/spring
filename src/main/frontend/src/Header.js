import React, { useEffect, useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";
import axios from "axios";
import MyHoverBtn from "./myBtn/MyHoverBtn";
import MobileHeader from "MobileHeader";

function Header(props) {
  const [isHoverLogin, setIsHoverLogin] = useState(false);
  const [isHoverJoin, setIsHoverJoin] = useState(false);
  const [showDropdownIntro, setShowDropdownIntro] = useState(false);
  const [showDropdownBeauty, setShowDropdownBeauty] = useState(false);
  const [showDropdownCenter, setShowDropdownCenter] = useState(false);
  const [showDropdownPet, setShowDropdownPet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1180);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    backgroundColor: "#f7f7f7",
    color: "#fff",
    marginBottom: "30px",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
  };
  const signButtonContainerStyle = {
    float: "right",
    gap: "10px",
  };

  const buttonStyle = {
    margin: "0px 0px 10px 0px",
    width: "200px",
    padding: "5px 10px",
    backgroundColor: "#c33586",
    color: "#ffffff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.1s ease-in-out",
    position: "relative",
    zIndex: 9999,
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff69b4",
  };

  return (
    <header style={isMobile ? null : headerStyle}>
      {isMobile == true ? (
        <MobileHeader
          navi={props.navi}
          userInfo={props.userInfo}
          setUserInfo={props.setUserInfo}
          setIsLogined={props.setIsLogined}
        />
      ) : (
        <>
          <a href="/">
            <img
              src={logoImg}
              alt="logoImage"
              style={{ width: "100px", height: "100px", marginLeft: "10px" }}
            />
          </a>
          <div style={buttonContainerStyle}>
            <button
              style={buttonStyle}
              onMouseEnter={() => setShowDropdownIntro(true)}
              onMouseLeave={() => setShowDropdownIntro(false)}
            >
              소개
              {showDropdownIntro && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "1%",
                  }}
                >
                  <MyHoverBtn
                    onClick="/intro/intro"
                    navi={props.navi}
                    name="회사소개"
                  />

                  <br />
                  <MyHoverBtn
                    onClick="/intro/handler"
                    navi={props.navi}
                    name="훈련사"
                  />
                  <br />
                  <MyHoverBtn
                    onClick="/intro/groomer"
                    navi={props.navi}
                    name="미용사"
                  />
                  <br />
                  <MyHoverBtn
                    onClick="/intro/hotel"
                    navi={props.navi}
                    name="호텔"
                  />
                  <br />
                </div>
              )}
            </button>
            <button
              style={buttonStyle}
              onMouseEnter={() => setShowDropdownBeauty(true)}
              onMouseLeave={() => setShowDropdownBeauty(false)}
            >
              미용
              {showDropdownBeauty && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "1%",
                  }}
                >
                  <MyHoverBtn
                    onClick="reservation"
                    navi={props.navi}
                    name="미용 예약"
                  />
                  <MyHoverBtn
                    onClick="/findReservation"
                    navi={props.navi}
                    name="미용 예약 조회"
                  />
                </div>
              )}
            </button>
            <button
              style={buttonStyle}
              onMouseEnter={() => setShowDropdownPet(true)}
              onMouseLeave={() => setShowDropdownPet(false)}
            >
              애견
              {showDropdownPet && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "1%",
                  }}
                >
                  <MyHoverBtn
                    onClick="/addpet"
                    navi={props.navi}
                    name="애견 정보 등록"
                  />
                  <MyHoverBtn
                    onClick="/myPet"
                    navi={props.navi}
                    name="나의 애견"
                  />
                </div>
              )}
            </button>
            <button
              style={buttonStyle}
              onMouseEnter={() => setShowDropdownCenter(true)}
              onMouseLeave={() => setShowDropdownCenter(false)}
            >
              고객센터
              {showDropdownCenter && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "1%",
                  }}
                >
                  <MyHoverBtn
                    onClick="/groomingQna"
                    navi={props.navi}
                    name="미용 문의"
                  />
                  <MyHoverBtn
                    onClick="/hotelQna"
                    navi={props.navi}
                    name="호텔 문의"
                  />
                </div>
              )}
            </button>
          </div>
          {props.userInfo == "" ? (
            <div style={signButtonContainerStyle}>
              <button
                style={{
                  ...buttonStyle,
                  ...(isHoverLogin && buttonHoverStyle),
                }}
                onMouseOver={() => setIsHoverLogin(true)}
                onMouseOut={() => setIsHoverLogin(false)}
                onClick={() => {
                  props.navi("/loginForm");
                }}
              >
                로그인
              </button>
              <br />
              <button
                style={{ ...buttonStyle, ...(isHoverJoin && buttonHoverStyle) }}
                onMouseOver={() => setIsHoverJoin(true)}
                onMouseOut={() => setIsHoverJoin(false)}
                onClick={() => {
                  props.navi("/joinForm");
                }}
              >
                회원가입
              </button>
            </div>
          ) : (
            <div style={{ color: "black" }}>
              <span
                onClick={() => props.navi("/user/mypage")}
                style={{
                  cursor: "pointer",
                  color: "hotpink",
                  fontSize: "1.5rem",
                  textDecoration: "underline",
                }}
              >
                {props.userInfo?.customerName}
              </span>{" "}
              님 안녕하세요. <br />
              {props.userInfo?.role == "ROLE_ADMIN" ||
              props.userInfo?.role == "ROLE_MANAGER" ? (
                <>
                  <button
                    id="myHoverBtn"
                    style={{
                      marginTop: "5px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      height: "30px",
                      width: "200px",
                    }}
                    onClick={() => {
                      props.navi("/admin");
                    }}
                  >
                    어드민 페이지
                  </button>
                  <br />
                </>
              ) : null}
              <button
                id="myHoverBtn"
                style={{
                  marginTop: "10px",
                  borderRadius: "5px",
                  height: "30px",
                  width: "200px",
                }}
                onClick={() => {
                  const body = {
                    jwtToken: localStorage.getItem("jwtToken"),
                    refreshToken: localStorage.getItem("refreshToken"),
                  };
                  axios.post("/api/logout", body, props.axiosConfig);
                  localStorage.removeItem("userInfo");
                  localStorage.removeItem("jwtToken");
                  localStorage.removeItem("refreshToken");
                  props.setUserInfo("");
                  props.setIsLogined(false);
                  clearInterval(props.tokenRefresh);
                }}
              >
                로그아웃
              </button>
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
