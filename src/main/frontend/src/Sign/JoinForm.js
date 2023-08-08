import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

function SignUpForm(props) {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("");
  const [customerAddressZonecode, setCustomerAddressZonecode] = useState();
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [emailDupChk, setEmailDupChk] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [regChk, setRegChk] = useState(true);

  useEffect(() => {
    if (emailDupChk == "lightGreen" && passwordChk == "lightGreen") {
      setRegChk(false);
    } else {
      setRegChk(true);
    }
  }, [emailDupChk, passwordChk]);

  const filterNumber = (event) => {
    var code = event.keyCode;
    if ((code > 47 && code < 58) || code == 8) {
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
      if (i < 10) {
        Array_Data.push("0" + i);
      } else {
        Array_Data.push(i);
      }
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
      if (i < 10) {
        Array_Data.push("0" + i);
      } else {
        Array_Data.push(i);
      }
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
    var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (exptext.test(event.currentTarget.value)) {
      axios
        .get("/api/emailDupChk", {
          params: { customerEmail: event.target.value },
        })
        .then((data) => {
          if (data.data == 1) {
            // 1 중복 / 0 중복아님
            setEmailDupChk("red");
          } else {
            setEmailDupChk("lightGreen");
          }
        });
    } else {
      setEmailDupChk("red");
    }
  };
  const onNameHandler = (event) => {
    setCustomerName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setCustomerPassword(event.currentTarget.value);
    if (ConfirmPassword !== event.target.value) {
      setPasswordChk("red");
    } else {
      setPasswordChk("lightGreen");
    }
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);

    if (customerPassword !== event.target.value) {
      setPasswordChk("red");
    } else {
      setPasswordChk("lightGreen");
    }
  };
  const onAddressHandler = (event) => {
    setCustomerAddressDetail(event.currentTarget.value);
  };

  const onGenderHandler = (event) => {
    setCustomerGender(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (customerPassword !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }
    if (event.target.customerGender.value == "성별") {
      event.target.customerGender.focus();
      return alert("성별을 선택해주세요.");
    }
    if (
      event.target.customerAgeYear == "출생년도" ||
      event.target.customerAgeMonth.value == "월" ||
      event.target.customerAgeDay.value == "일"
    ) {
      event.target.customerAgeYear.focus();
      return alert("출생년도 또는 월, 일을 선택해주세요.");
    }

    if (
      event.target.phoneMiddle.value == "" ||
      event.target.phoneLast.value == ""
    ) {
      event.target.phoneMiddle.focus();
      return alert("핸드폰 번호를 입력해주세요.");
    }

    if (
      event.target.customerAddress.value == "" ||
      event.target.customerAddressDetail.value == ""
    ) {
      event.target.customerAddressDetail.focus();
      return alert("주소와 상세주소를 입력해주세요.");
    }

    let body = {
      customerEmail: customerEmail,
      customerName: customerName,
      customerAddress: customerAddress + " " + customerAddressDetail,
      customerPassword: customerPassword,
      customerGender: customerGender,
      customerAge: parseInt(
        event.target.customerAgeYear.value +
          event.target.customerAgeMonth.value +
          event.target.customerAgeDay.value
      ),
      customerPhone:
        event.target.phoneFirst.value +
        event.target.phoneMiddle.value +
        event.target.phoneLast.value,
    };

    console.log(body);

    axios
      .post("/api/join", body)
      .then((data) => {
        if (data.data === 1) {
          alert("가입되었습니다.");
          props.navi("/loginForm");
        }
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
          height: "80%",
        }}
      >
        <fieldset>
          <legend style={{ textAlign: "center" }}>Join</legend>
          <form
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
            onSubmit={onSubmitHandler}
          >
            <label>Email</label>
            <input
              type="email"
              value={customerEmail}
              onChange={onEmailHandler}
              style={{ backgroundColor: emailDupChk }}
            />
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
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <select name="customerAgeYear">
                <option selected disabled>
                  출생년도
                </option>
                {YearList()}
              </select>
              <select name="customerAgeMonth">
                <option selected disabled>
                  월
                </option>
                {MonthList()}
              </select>
              <select name="customerAgeDay">
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
              -
              <input
                name="phoneMiddle"
                type="number"
                onKeyDown={filterNumber}
              />
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
              style={{ backgroundColor: passwordChk }}
            />
            <br />
            <input
              type="text"
              placeholder="우편번호"
              value={customerAddressZonecode}
              readOnly
            />
            <input
              name="findPost"
              type="button"
              onClick={postHandle.clickBtn}
              value="우편번호 찾기"
            />
            <br />
            <input
              type="text"
              placeholder="주소"
              name="customerAddress"
              value={customerAddress}
            />
            <input
              name="customerAddressDetail"
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
            <button disabled={regChk}>회원가입</button>
          </form>
          <br />
        </fieldset>
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
