import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

function SignUpForm() {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("");
  const [customerAddressZonecode, setCustomerAddressZonecode] = useState();
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [customerAge, setCustomerAge] = useState("");

  const filterNumber = (event) => {
    var code = event.keyCode;
    if (code > 47 && code < 58) {
      return;
    }
    event.preventDefault();
  };

  let YearList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      Array_Data.push(i);
    }

    Array_Data.map((data, index) => {
      result.push(
        <option key={index} value={data}>
          {data}
        </option>
      );
    });
    return result;
  };
  let MonthList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1; i <= 12; i++) {
      Array_Data.push(i);
    }

    Array_Data.map((data, index) => {
      result.push(
        <option key={index} value={data}>
          {data}
        </option>
      );
    });
    return result;
  };
  let DayList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1; i <= 31; i++) {
      Array_Data.push(i);
    }

    Array_Data.map((data, index) => {
      result.push(
        <option key={index} value={data}>
          {data}
        </option>
      );
    });
    return result;
  };

  const onEmailHandler = (event) => {
    setCustomerEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setCustomerName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setCustomerPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onAddressHandler = (event) => {
    setCustomerAddressDetail(event.currentTarget.value);
  };

  const onGenderHandler = (event) => {
    setCustomerGender(event.currentTarget.value);
  };

  const onAgeHandler = (event) => {
    setCustomerAge(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (customerPassword !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    let body = {
      customerEmail: customerEmail,
      customerName: customerName,
      customerAddress: customerAddress + " " + customerAddressDetail,
      customerPassword: customerPassword,
      customerGender: customerGender,
      customerPhone:
        event.target.phoneFirst +
        event.target.phoneMiddle +
        event.target.phoneLast,
    };

    console.log(body);

    axios
      .post("/api/sign/up", body)
      .then((data) => {
        //회원가입 로직 작성
      })
      .catch((er) => console.log(er));
  };

  const postHandle = {
    clickBtn: () => {
      setOpenPostcode((current) => !current);
    },
    selectAddress: (data) => {
      setCustomerAddress(data.address);
      setCustomerAddressZonecode(data.zonecode);
      setOpenPostcode(false);
    },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "50vh",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={customerEmail} onChange={onEmailHandler} />
          <label>Name</label>
          <input type="text" value={customerName} onChange={onNameHandler} />
          <label>Gender</label>
          <select name="customerGender" onChange={onGenderHandler}>
            <option disabled selected>
              성별
            </option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          <label>Age</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <select name="customerAgeYear" onChange={onAgeHandler}>
              <option selected disabled>
                출생년도
              </option>
              {YearList()}
            </select>
            <select name="customerAgeMonth" onChange={onAgeHandler}>
              <option selected disabled>
                월
              </option>
              {MonthList()}
            </select>
            <select name="customerAgeDay" onChange={onAgeHandler}>
              <option selected disabled>
                일
              </option>
              {DayList()}
            </select>
          </div>
          <label>Phone Number</label>
          <div>
            {" "}
            <input name="phoneFirst" type="number" readOnly value="010" />
            -<input name="phoneMiddle" type="number" onKeyDown={filterNumber} />
            -
            <input name="phoneLast" type="number" onKeyDown={filterNumber} />
          </div>

          <label>Password</label>
          <input
            type="password"
            value={customerPassword}
            onChange={onPasswordHandler}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <br />
          <input
            type="text"
            placeholder="우편번호"
            value={customerAddressZonecode}
            readOnly
          />
          <input
            type="button"
            onClick={postHandle.clickBtn}
            value="우편번호 찾기"
          />
          <br />
          <input type="text" placeholder="주소" value={customerAddress} />
          <input
            type="text"
            placeholder="상세주소"
            onChange={onAddressHandler}
          />
          <br />
          <div
            id="wrap"
            style={{
              display: "none",
              border: "1px solid",
              width: "500px",
              height: "300px",
              margin: "5px 0",
              position: "relative",
            }}
          >
            <img
              src="//t1.daumcdn.net/postcode/resource/images/close.png"
              id="btnFoldWrap"
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "0px",
                top: "-1px",
                zIndex: "1",
              }}
              onClick={postHandle.clickBtn}
              alt="접기 버튼"
            />
          </div>
          <button formAction="">회원가입</button>
        </form>
        <br />
      </div>
      {openPostcode && (
        <DaumPostcode
          className="postcode"
          style={{ borderTop: "1px solid black", marginTop: "10px" }}
          onComplete={postHandle.selectAddress}
          autoClose={false}
        />
      )}
    </>
  );
}
export default SignUpForm;
