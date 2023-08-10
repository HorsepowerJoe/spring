import { useEffect, useState } from "react";
import axios from "axios";
import backgroundGoogle from "../img/google/btn_google_signin_dark_normal_web.png";
import backgroundGoogleHover from "../img/google/btn_google_signin_dark_focus_web.png";
import backgroundImageFacebook from "../img/facebook/ZW4QC.png";
import backgroundImageNaver from "../img/naver/btnW_완성형.png";
import backgroundImageNaverHover from "../img/naver/btnG_완성형.png";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import * as config from "../global_variables";
import NaverLogin from "./NaverLogin";

function Login(props) {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [isHoverGoogle, setIsHoverGoogle] = useState(false);
  const [isHoverFacebook, setIsHoverFacebook] = useState(false);
  const [isHoverNaver, setIsHoverNaver] = useState(false);
  const [isHoverLoginBtn, setIsHoverLoginBtn] = useState(false);
  const GOOGLE_KEY = config.GOOGLE_KEY;
  const FACEBOOK_KEY = config.FACEBOOK_KEY;
  const NAVER_KEY = config.NAVER_KEY;

  useEffect(() => {
    if (props.userInfo !== "") {
      console.log(props.userInfo);
      const body = {
        username: props.userInfo.email,
        customerEmail: props.userInfo.email,
        customerName: props.userInfo.name,
        provider: "naver",
      };
      console.log(body);
      axios.post("/api/joinCheck", body).then((data) => {
        //가입 여부 확인
        if (data.data == 1) {
          //가입되어있다면
          axios
            .post("/login", body) // 로그인 수행
            .then((data) => console.log(data.data))
            .catch((er) => console.log(er));
        } else {
          //가입 정보 없다면
          alert(data.data);
          alert("추가 회원 정보가 필요합니다.");
          props.navi("/extraJoin"); //추가 정보 기입받아서 가입시키기
        }
      });
    }
  }, [props.getToken, props.userInfo]);

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

    axios
      .post("/login", {
        username: customerEmail,
        customerEmail: customerEmail,
        customerPassword: customerPassword,
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((er) => console.log(er));
  };

  // const NaverLogin = () => {
  //   const REDIRECT_URI = "http://localhost:3000/naverLoginSuccessed/";
  //   const STATE = "false";
  //   const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_KEY}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  //   const NaverLogin = () => {
  //     window.location.href = NAVER_AUTH_URL;
  //   };

  //   useEffect(() => {
  //     let code = new URL(window.location.href).searchParams.get("code");
  //     console.log(code);
  //   });

  //   return (
  //     <div
  //       onClick={NaverLogin}
  //       onMouseOver={() => {
  //         setIsHoverNaver(true);
  //       }}
  //       onMouseLeave={() => {
  //         setIsHoverNaver(false);
  //       }}
  //       style={{
  //         height: "50px",
  //         backgroundImage: isHoverNaver
  //           ? `url(${backgroundImageNaverHover})`
  //           : `url(${backgroundImageNaver})`,
  //         backgroundSize: "247.5px 46px",
  //         backgroundRepeat: "no-repeat",
  //         cursor: "pointer",
  //       }}
  //     ></div>
  //   );
  // };

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
          <GoogleOAuthProvider clientId={`${GOOGLE_KEY}`}>
            <GoogleLogin
              width="246px"
              clientId={`${GOOGLE_KEY}`}
              onSuccess={(res) => console.log(res, "성공")}
              onFailure={(res) => console.log(res, "실패")}
              render={(renderProps) => (
                <div
                  className="social_login_box google"
                  onClick={renderProps.onClick}
                >
                  <div className="social_login_image_box"></div>
                  <div className="social_login_text_box">구글로 시작하기</div>
                  <div className="social_login_blank_box"> </div>
                </div>
              )}
            />
          </GoogleOAuthProvider>
          <span
            onMouseOver={() => setIsHoverFacebook(true)}
            onMouseOut={() => setIsHoverFacebook(false)}
          >
            <FacebookLogin
              size="small"
              appId={`${FACEBOOK_KEY}`}
              autoLoad={false}
              fields="name,first_name,last_name,email"
              callback={(resp) => {
                console.log(resp);
              }}
              disableMobileRedirect={true}
              render={(renderProps) => (
                <button onClick={renderProps.onClick}>페이스북 로그인</button>
              )}
            />
            {/* <NaverLogin /> */}
            <NaverLogin
              setGetToken={props.setGetToken}
              setUserInfo={props.setUserInfo}
              NAVER_KEY={NAVER_KEY}
            />
          </span>
          {/*
          JWT 도입으로 미사용
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
          */}
        </form>
        <br />
      </fieldset>
    </div>
  );
}

export default Login;
