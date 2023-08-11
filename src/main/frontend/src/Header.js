import { useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";

function Header(props) {
  const [isHoverLogin, setIsHoverLogin] = useState(false);
  const [isHoverJoin, setIsHoverJoin] = useState(false);

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
    paddingRight: "10px",
  };

  const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: "#c33586",
    color: "#ffffff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.1s ease-in-out",
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
          {props.userInfo?.customerName}님 안녕하세요. <br />
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              props.setUserInfo("");
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
