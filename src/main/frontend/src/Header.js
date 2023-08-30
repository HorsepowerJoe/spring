// import { useState } from "react";
// import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";

// function Header(props) {
//   const [isHoverLogin, setIsHoverLogin] = useState(false);
//   const [isHoverJoin, setIsHoverJoin] = useState(false);

//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "5px",
//     backgroundColor: "#f7f7f7",
//     color: "#fff",
//     marginBottom: "30px",
//   };

//   const buttonContainerStyle = {
//     display: "flex",
//     gap: "10px",
//     paddingRight: "10px",
//   };

//   const buttonStyle = {
//     padding: "5px 10px",
//     backgroundColor: "#c33586",
//     color: "#ffffff",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     fontWeight: "bold",
//     transition: "background-color 0.1s ease-in-out",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#ff69b4",
//   };

//   return (
//     <header style={headerStyle}>
//       <a href="/index.html">
//         <img
//           src={logoImg}
//           alt="logoImage"
//           style={{ width: "100px", height: "100px", marginLeft: "10px" }}
//         />
//       </a>
//       {props.userInfo == "" ? (
//         <div style={buttonContainerStyle}>
//           <button
//             style={{ ...buttonStyle, ...(isHoverLogin && buttonHoverStyle) }}
//             onMouseOver={() => setIsHoverLogin(true)}
//             onMouseOut={() => setIsHoverLogin(false)}
//             onClick={() => {
//               props.navi("/loginForm");
//             }}
//           >
//             로그인
//           </button>
//           <button
//             style={{ ...buttonStyle, ...(isHoverJoin && buttonHoverStyle) }}
//             onMouseOver={() => setIsHoverJoin(true)}
//             onMouseOut={() => setIsHoverJoin(false)}
//             onClick={() => {
//               props.navi("/joinForm");
//             }}
//           >
//             회원가입
//           </button>
//         </div>
//       ) : (
//         <div style={{ color: "black" }}>
//           <span
//             onClick={() => props.navi("/user/mypage")}
//             style={{
//               cursor: "pointer",
//               color: "hotpink",
//               fontSize: "1.5rem",
//               textDecoration: "underline",
//             }}
//           >
//             {props.userInfo?.customerName}
//           </span>{" "}
//           님 안녕하세요. <br />
//           <button
//             style={{ marginTop: "10px", marginLeft: "60px" }}
//             onClick={() => {
//               localStorage.removeItem("userInfo");
//               props.setUserInfo("");
//             }}
//           >
//             로그아웃
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }
// export default Header;

import React, { useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";
import axios from "axios";

function Header(props) {
  const [isHoverLogin, setIsHoverLogin] = useState(false);
  const [isHoverJoin, setIsHoverJoin] = useState(false);
  const [showDropdownIntro, setShowDropdownIntro] = useState(false);
  const [showDropdownBeauty, setShowDropdownBeauty] = useState(false);
  const [showDropdownCenter, setShowDropdownCenter] = useState(false);
  const [showDropdownPet, setShowDropdownPet] = useState(false);

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
    <header style={headerStyle}>
      <a href="/index.html">
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
              <button
                style={buttonStyle}
                onClick={() => {
                  props.navi("/intro");
                }}
              >
                회사소개
              </button>
              <br />
              <button
                style={buttonStyle}
                onClick={() => {
                  props.navi("/intro/handler");
                }}
              >
                훈련사
              </button>
              <br />
              <button
                style={buttonStyle}
                onClick={() => {
                  props.navi("/intro/groomer");
                }}
              >
                미용사
              </button>
              <br />
              <button
                style={buttonStyle}
                onClick={() => {
                  props.navi("/intro/hotel");
                }}
              >
                호텔
              </button>
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
              <button
                style={buttonStyle}
                onClick={() => {
                  props.navi("reservation");
                }}
              >
                미용 예약
              </button>
              <button style={buttonStyle}>미용 예약 조회</button>
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
              <button
                style={buttonStyle}
                onClick={() => {
                  props.navi("/addpet");
                }}
              >
                애견 정보 등록
              </button>

              <button style={buttonStyle} onClick={() => props.navi("/myPet")}>
                나의 애견
              </button>
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
              <button style={buttonStyle}>미용 문의</button>
              <button style={buttonStyle}>호텔 문의</button>
            </div>
          )}
        </button>
      </div>
      {props.userInfo == "" ? (
        <div style={buttonContainerStyle}>
          <button
            style={{ ...buttonStyle, ...(isHoverLogin && buttonHoverStyle) }}
            onMouseOver={() => setIsHoverLogin(true)}
            onMouseOut={() => setIsHoverLogin(false)}
            onClick={() => {
              props.navi("/loginForm");
            }}
          >
            로그인
          </button>
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
          <button
            style={{ marginTop: "10px", marginLeft: "60px" }}
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
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
