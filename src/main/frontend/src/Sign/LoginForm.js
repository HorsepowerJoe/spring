import { useState } from "react";
import axios from "axios";

function Login() {
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

    let body = {
      customerEmail: customerEmail,
      customerPassword: customerPassword,
    };

    axios
      .post("/api/sign/up", body)
      .then((data) => {
        //로그인 로직 작성
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
          <button formAction="">Login</button>
        </form>
        <br />
      </fieldset>
    </div>
  );
}

export default Login;
