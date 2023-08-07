import { useState } from "react";
import axios from "axios";
import backgroundGoogle from "../img/google/btn_google_signin_dark_normal_web.png";
import backgroundGoogleHover from "../img/google/btn_google_signin_dark_focus_web.png";
import backgroundImageFacebook from "../img/facebook/ZW4QC.png";
import backgroundImageNaver from "../img/naver/btnW_완성형.png";
import backgroundImageNaverHover from "../img/naver/btnG_완성형.png";

function Login(props) {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [isHoverGoogle, setIsHoverGoogle] = useState(false);
  const [isHoverFacebook, setIsHoverFacebook] = useState(false);
  const [isHoverNaver, setIsHoverNaver] = useState(false);
  const [isHoverLoginBtn, setIsHoverLoginBtn] = useState(false);

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: isHoverLoginBtn ? "#ff69b4" : "#c33586",
    color: "#ffffff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.1s ease-in-out",
  };

  const onEmailHandler = (event) => {
    setCustomerEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setCustomerPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    //스프링 시큐리티는 form type으로 받아야 처리 가능한것 같음 Json 쓰지 말기
    axios
      .post(
        "/login",
        {
          customerEmail: customerEmail,
          customerPassword: customerPassword,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then((data) => {
        console.log(data.data);
      })
      .catch((er) => console.log(er));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <fieldset>
        <legend style={{ textAlign: "center" }}>Login</legend>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "100px",
          }}
          onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={customerEmail} onChange={onEmailHandler} />
          <label>Password</label>
          <input
            type="password"
            value={customerPassword}
            onChange={onPasswordHandler}
          />
          <br /> <br /> <br /> <br />
          <button
            onMouseOver={() => {
              setIsHoverLoginBtn(true);
            }}
            onMouseOut={() => setIsHoverLoginBtn(false)}
            style={buttonStyle}
            type="submit"
          >
            Login
          </button>
          <a
            href="http://localhost:8085/oauth2/authorization/google"
            style={{
              width: "191px",
              height: "46px",
            }}
          >
            <div
              onMouseOver={() => {
                setIsHoverGoogle(true);
              }}
              onMouseOut={() => setIsHoverGoogle(false)}
              style={{
                backgroundImage: isHoverGoogle
                  ? `url(${backgroundGoogleHover})`
                  : `url(${backgroundGoogle})`,
                backgroundSize: "191px 46px",
                width: "191px",
                height: "46px ",
              }}
            ></div>
          </a>
          <a href="http://localhost:8085/oauth2/authorization/facebook">
            <div
              onMouseOver={() => {
                setIsHoverFacebook(true);
              }}
              onMouseOut={() => {
                setIsHoverFacebook(false);
              }}
              style={{
                width: "191px",
                height: "46px",
                backgroundImage: isHoverFacebook
                  ? `url(${backgroundImageFacebook})`
                  : `url(${backgroundImageFacebook})`,
                backgroundSize: isHoverFacebook ? "191px 50px" : "191px 46px",
                marginBottom: "2px",
              }}
            ></div>
          </a>
          <a
            href="http://localhost:8085/oauth2/authorization/naver"
            style={{
              width: "191px",
              height: "50px",
            }}
          >
            <div
              onMouseOver={() => {
                setIsHoverNaver(true);
              }}
              onMouseLeave={() => {
                setIsHoverNaver(false);
              }}
              style={{
                width: "191px",
                height: "50px",
                backgroundImage: isHoverNaver
                  ? `url(${backgroundImageNaverHover})`
                  : `url(${backgroundImageNaver})`,
                backgroundSize: "191px 46px",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </a>
        </form>
        <br />
      </fieldset>
    </div>
  );
}

export default Login;
