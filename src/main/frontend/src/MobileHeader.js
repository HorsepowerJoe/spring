import React, { useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";
import MyHoverBtn from "./myBtn/MyHoverBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function MobileHeader(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHoverLogin, setIsHoverLogin] = useState(false);
  const [isHoverJoin, setIsHoverJoin] = useState(false);

  const buttonHoverStyle = {
    backgroundColor: "#ff69b4",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const mobileMenuStyle = {
    display: isMobileMenuOpen ? "block" : "none",

    position: "absolute",
    top: "130px",
    left: "0",
    width: "100%",
    zIndex: "9999",
    color: "#ffffff",
    transition: "transform 0.3s ease-in-out",
    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
  };

  const loginButtonStyle = {
    margin: "0px 0px 10px 0px",
    width: "100%",
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

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#f7f7f7",
    color: "#c33586",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    borderBottom: "1px solid black",
  };
  const innerButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "white",
    color: "#c33586",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          backgroundColor: "#f7f7f7",
          height: "130px",
          marginBottom: "10px",
          borderBottom: isMobileMenuOpen ? "1px solid black" : "",
        }}
      >
        <button
          style={{
            ...innerButtonStyle,
            backgroundColor: "#f7f7f7",
            left: "0px",
            top: "0px",
          }}
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faClose : faBars}
            size="2x"
          />
        </button>
        <a href="/" style={{ margin: "0 auto", marginTop: "12.5px" }}>
          <img
            src={logoImg}
            alt="logoImage"
            style={{ width: "100px", height: "100px" }}
          />
        </a>
        {props.userInfo == "" ? (
          <div style={{ position: "absolute", right: "10px", top: "25px" }}>
            <button
              style={{
                ...loginButtonStyle,
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
              style={{
                ...loginButtonStyle,
                ...(isHoverJoin && buttonHoverStyle),
              }}
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
          <div
            style={{
              color: "black",
              position: "relative",
              right: "0",
            }}
          >
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
      </div>
      <div style={mobileMenuStyle}>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li>
            <button style={buttonStyle} onClick={() => toggleSubMenu("intro")}>
              소개
            </button>
            {activeMenu === "intro" && (
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/intro/intro");
                      toggleMobileMenu();
                    }}
                  >
                    회사소개
                  </button>
                </li>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/intro/handler");
                      toggleMobileMenu();
                    }}
                  >
                    훈련사
                  </button>
                </li>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/intro/groomer");
                      toggleMobileMenu();
                    }}
                  >
                    미용사
                  </button>
                </li>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/intro/hotel");
                      toggleMobileMenu();
                    }}
                  >
                    호텔
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button style={buttonStyle} onClick={() => toggleSubMenu("beauty")}>
              미용
            </button>
            {activeMenu === "beauty" && (
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/reservation");
                      toggleMobileMenu();
                    }}
                  >
                    미용 예약
                  </button>
                </li>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/findReservation");
                      toggleMobileMenu();
                    }}
                  >
                    미용 예약 조회
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button style={buttonStyle} onClick={() => toggleSubMenu("pet")}>
              애견
            </button>
            {activeMenu === "pet" && (
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/addpet");
                      toggleMobileMenu();
                    }}
                  >
                    애견 정보 등록
                  </button>
                </li>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/myPet");
                      toggleMobileMenu();
                    }}
                  >
                    나의 애견
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button style={buttonStyle} onClick={() => toggleSubMenu("center")}>
              고객센터
            </button>
            {activeMenu === "center" && (
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/groomingQna");
                      toggleMobileMenu();
                    }}
                  >
                    미용 문의
                  </button>
                </li>
                <li>
                  <button
                    style={innerButtonStyle}
                    onClick={() => {
                      props.navi("/hotelQna");
                      toggleMobileMenu();
                    }}
                  >
                    호텔 문의
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileHeader;
