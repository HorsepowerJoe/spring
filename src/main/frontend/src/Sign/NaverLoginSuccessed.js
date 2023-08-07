import { useEffect } from "react";
import { useParams } from "react-router-dom";

function NaverLoginSuccessed(props) {
  const { params } = useParams();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    //백으로 보내기
    // window.location.replace('/') 사용
  });
  return <div>asdf</div>;
}

export default NaverLoginSuccessed;
