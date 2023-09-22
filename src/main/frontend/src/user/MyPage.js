import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

//마이페이지
//내 정보(/api/user/modifyuserinfo)
//나의 예약(/api/user/reservation)
function MyPage(props) {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [customerGender, setCustomerGender] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("");
  const [customerAddressZonecode, setCustomerAddressZonecode] = useState();
  const [regChk, setRegChk] = useState(false);
  const [myPageInfo, setMyPageInfo] = useState([]);
  const [originPhoneLast, setOriginPhoneLast] = useState("");
  const [originPhoneMiddle, setOriginPhoneMiddle] = useState("");

  const axiosConfig = {
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
  };

  useEffect(() => {
    const body = {
      username: JSON.parse(localStorage.getItem("userInfo")).username,
    };

    axios
      .post("/api/user/finduserinfo", body, axiosConfig)
      .then((data) => {
        if (data.status === 200) {
          console.log(1, data.data);
          setMyPageInfo(data.data);
          setOriginPhoneMiddle(data.data.customerPhone.substr(3, 4));
          setOriginPhoneLast(data.data.customerPhone.substr(7, 4));
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const onAddressHandler = (event) => {
    setCustomerAddressDetail(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      username: myPageInfo.username,
      customerNum: myPageInfo.customerNum,
      customerGender: event.target.customerGender.value,
      customerAddress:
        customerAddress == null || customerAddress == ""
          ? myPageInfo.customerAddress
          : customerAddress + " " + customerAddressDetail,
      customerPhone:
        event.target.phoneMiddle.value == null ||
        event.target.phoneLast.value == null ||
        event.target.phoneMiddle.value == "" ||
        event.target.phoneLast.value == ""
          ? myPageInfo.customerPhone
          : event.target.phoneFirst.value +
            event.target.phoneMiddle.value +
            event.target.phoneLast.value,
      customerAge: parseInt(
        event.target.customerAgeYear.value +
          event.target.customerAgeMonth.value +
          event.target.customerAgeDay.value
      ),
    };

    if (body.customerGender == "성별") {
      alert("성별을 선택해주세요.");
      return;
    }

    if (
      event.target.customerAgeYear == "출생년도" ||
      event.target.customerAgeMonth.value == "월" ||
      event.target.customerAgeDay.value == "일"
    ) {
      event.target.customerAgeYear.focus();
      return alert("출생년도 또는 월, 일을 선택해주세요.");
    }

    axios
      .post("/api/user/modifyUserInfo", body, axiosConfig)
      .then((data) => {
        if (data.status == 200) {
          props.tokenRefresh();
          alert("수정되었습니다.");
          props.navi("/");
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

  const onGenderHandler = (event) => {
    setCustomerGender(event.currentTarget.value);
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
        <fieldset style={{ border: "1px solid black" }}>
          <legend
            style={{
              textAlign: "center",
              backgroundColor: "lightgray",
              border: "0",
            }}
          >
            회원 정보 수정
          </legend>
          <form
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
            onSubmit={onSubmitHandler}
          >
            <label>Email</label>
            <input
              name="customerEmail"
              type="email"
              value={myPageInfo.customerEmail}
            />
            <label>Name</label>
            <input
              name="customerName"
              type="text"
              value={myPageInfo.customerName}
            />

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
                maxLength="4"
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength)
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                }}
                defaultValue={originPhoneMiddle}
              />
              -
              <input
                name="phoneLast"
                type="number"
                maxLength="4"
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength)
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                }}
                defaultValue={originPhoneLast}
              />
            </div>
            <br />
            <label>Origin Address</label>
            <input type="text" value={myPageInfo.customerAddress} readOnly />
            <label>New Address</label>
            <input
              type="text"
              placeholder="우편번호"
              value={customerAddressZonecode}
              readOnly
            />
            <br />
            <button
              id="myHoverBtn"
              style={{ borderRadius: "5px", height: "30px" }}
              name="findPost"
              type="button"
              onClick={postHandle.clickBtn}
            >
              우편번호 찾기
            </button>
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
            <button
              id="myHoverBtn"
              style={{ borderRadius: "5px", height: "30px" }}
              disabled={regChk}
            >
              수정하기
            </button>
          </form>
          <br />
        </fieldset>
      </div>
      {openPostcode && (
        <DaumPostcode
          className="postcode"
          style={{
            borderTop: "1px solid black",
            marginTop: "10px",
            position: "absolute",
            bottom: "0",
          }}
          onComplete={postHandle.selectAddress}
          autoClose={false}
        />
      )}
    </>
  );
}

export default MyPage;
