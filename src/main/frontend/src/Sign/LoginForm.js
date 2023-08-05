import { useState } from "react";
import axios from "axios";

function Login(props) {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

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
        height: "50vh",
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
          <button type="submit">Login</button>
          <a href="http://localhost:8085/oauth2/authorization/google">
            구글 로그인
          </a>
        </form>
        <br />
      </fieldset>
    </div>
  );
}

export default Login;
