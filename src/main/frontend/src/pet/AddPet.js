import axios from "axios";

function AddPet(props) {
  const axiosConfig = {
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
  };

  console.log(JSON.parse(localStorage.getItem("userInfo")));

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      petName: event.target.petName.value,
      petGender: event.target.petGender.value,
      petBreed: event.target.petBreed.value,
      petAge:
        event.target.petAgeYear.value +
        event.target.petAgeMonth.value +
        event.target.petAgeDay.value,
      petWeight: event.target.petWeight.value,
      petSnitchy: event.target.petSnitchy.value,
      extraData: event.target.extraData.value,
      customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
    };

    axios.post("/api/user/addPet", body, axiosConfig).then((data) => {
      if (data.status == 200) {
        alert("등록되었습니다.");
        props.navi("/");
      } else {
        alert("서버 통신 에러!");
      }
    });
  };

  let YearList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
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
        <fieldset>
          <legend style={{ textAlign: "center" }}>애견 등록</legend>
          <form
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
            onSubmit={onSubmitHandler}
          >
            <label>Pet Name</label>
            <input
              name="petName"
              type="text"
              placeholder="이름을 입력해주세요."
              required
            />
            <label>Pet Gender</label>
            <select name="petGender">
              <option disabled selected>
                성별
              </option>
              <option value="male">남아</option>
              <option value="female">여아</option>
            </select>
            <label>Pet Breed</label>
            <input
              type="text"
              name="petBreed"
              placeholder="견종을 입력해주세요."
            />
            <label>Pet Age</label>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <select name="petAgeYear">
                <option selected disabled>
                  출생년도
                </option>
                {YearList()}
              </select>
              <select name="petAgeMonth">
                <option selected disabled>
                  월
                </option>
                {MonthList()}
              </select>
              <select name="petAgeDay">
                <option selected disabled>
                  일
                </option>
                {DayList()}
              </select>
            </div>
            <label>Pet Weight</label>
            <div>
              <input
                type="number"
                name="petWeight"
                placeholder="Kg단위로 입력해주세요."
                style={{ width: "98.5%" }}
              />
            </div>
            <br />
            <br />
            <label>Snitchy</label>
            <label>
              <input type="radio" name="petSnitchy" value="true" />
              입질있음
            </label>
            <label>
              <input type="radio" name="petSnitchy" value="false" />
              입질없음
            </label>
            <br />
            <br />
            <label>Extra</label>
            특이사항이 있다면 여기에 적어주세요
            <textarea name="extraData" cols="50" rows="10"></textarea>
            <br />
            <button>등록하기</button>
          </form>
          <br />
        </fieldset>
      </div>
    </>
  );
}

export default AddPet;
