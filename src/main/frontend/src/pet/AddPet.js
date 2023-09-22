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
      petAge: event.target.petAgeYear.value,
      petWeight: event.target.petWeight.value,
      petNeutered: event.target.petNeutered.value,
      petSnitchy: event.target.petSnitchy.value,
      extraData: event.target.extraData.value,
      customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
    };

    if (body.petGender == "성별") {
      alert("성별을 선택해주세요.");
      return;
    }

    if (body.petAge == "나이") {
      alert("나이를 선택해주세요.");
      return;
    }

    axios
      .post("/api/user/addPet", body, axiosConfig)
      .then((data) => {
        if (data.status == 200) {
          alert("등록되었습니다.");
          props.navi("/");
        } else {
          alert("서버 통신 에러!");
        }
      })
      .catch((er) => {
        console.log(er);
        alert("서버 통신 에러!");
      });
  };

  let YearList = () => {
    let result = [];
    let Array_Data = [];
    for (let i = 1; i <= 50; i++) {
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
        <fieldset style={{ border: "1px solid black", width: "600px" }}>
          <legend
            style={{
              textAlign: "center",
              backgroundColor: "lightgray",
              border: "0",
            }}
          >
            애견 등록
          </legend>
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
              required
            />
            <label>Pet Age</label>
            <div>
              <select name="petAgeYear" style={{ width: "100%" }}>
                <option selected disabled>
                  나이
                </option>
                {YearList()}
              </select>
            </div>
            <label>Pet Weight</label>
            <div>
              <input
                type="number"
                name="petWeight"
                step={0.1}
                placeholder="Kg단위로 입력해주세요."
                style={{ width: "98.5%" }}
                required
              />
            </div>
            <br />
            <br />
            <label>Snitchy</label>
            <label>
              <input type="radio" name="petSnitchy" value="true" required />
              입질있음
            </label>
            <label>
              <input type="radio" name="petSnitchy" value="false" required />
              입질없음
            </label>
            <br />
            <label>Neutered</label>
            <label>
              <input type="radio" name="petNeutered" value="true" required />
              중성화 되어 있음
            </label>
            <label>
              <input type="radio" name="petNeutered" value="false" required />
              중성화 하지 않음
            </label>
            <br />
            <br />
            <label>Extra</label>
            특이사항이 있다면 여기에 적어주세요
            <textarea name="extraData" cols="50" rows="10"></textarea>
            <br />
            <button
              id="myHoverBtn"
              style={{ borderRadius: "5px", height: "30px" }}
            >
              등록하기
            </button>
          </form>
          <br />
        </fieldset>
      </div>
    </>
  );
}

export default AddPet;
