import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function NaverLoginSuccessed(props) {
  const params = useParams();

  // useEffect(() => {
  //   if (props.userInfo !== "") {
  //     console.log(props.userInfo);
  //     const body = {
  //       username: props.userInfo.email,
  //       customerEmail: props.userInfo.email,
  //       customerName: props.userInfo.name,
  //     };
  //     console.log(body);
  //     axios.post("/api/joinCheck", body).then((data) => {
  //       //가입 여부 확인

  //       if (data.data == 1) {
  //         //가입되어있다면
  //         axios
  //           .post("http://localhost:8085/oauth/jwt/naver", body) // 로그인 수행
  //           .then((data) => console.log(data.data))
  //           .catch((er) => console.log(er));
  //       } else {
  //         //가입 정보 없다면
  //         alert("상태코드" + data.data);
  //         alert("추가 회원 정보가 필요합니다.");
  //         props.navi("/extraJoin"); //추가 정보 기입받아서 가입시키기
  //       }
  //     });
  //   }

  const token = window.location.href.split("=")[1].split("&")[0];

  axios.post("/naver/getProfile", token).then((data) => {
    localStorage.setItem("jwtToken", "Bearer " + data.data.jwtToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem(
      "userInfo",
      JSON.stringify(jwtDecode(data.data.jwtToken))
    );
    props.setUserInfo(jwtDecode(data.data.jwtToken));
    props.navi("/");
  });

  //   //백으로 보내기
  //   // window.location.replace('/') 사용
  //   axios.post("/login", null, {
  //     headers: {
  //       Authorization: code,
  //     },
  //   });
  // });
  return <div>asdf</div>;
}

export default NaverLoginSuccessed;
