import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { setHours, setMinutes } from "date-fns";
import axios from "axios";

function Reservation(props) {
  const [startDate, setStartDate] = useState("");
  const [excludedTimes, setExcludedTimes] = useState("");
  const [excludedList, setExcludedList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [styles, setStyles] = useState([]);
  const [price, setPrice] = useState("");
  const [r_visitDate, setR_visitDate] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      r_visitDate: r_visitDate,
      petNum: event.target.petNum.value,
      customerNum: props.userInfo.id,
      g_num: event.target.g_num.value,
    };
    axios
      .post("/api/reserve/reservation", body, props.axiosConfig)
      .then((data) => {
        if (data.status == 200) {
          props.navi("/");
          alert("예약되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .post(
        "/api/user/viewPet",
        { customerNum: props.userInfo.id },
        props.axiosConfig
      )
      .then((data) => {
        console.log("", data.data);
        setPetList(JSON.parse(JSON.stringify(data.data)));
      });

    axios
      .get("/api/grooming/getStyles", null, props.axiosConfig)
      .then((data) => {
        setStyles(JSON.parse(JSON.stringify(data.data)));
      });
  }, []);

  const pet = petList.map((pet) => (
    <option key={pet.petNum} value={pet.petNum}>
      {pet.petName}
    </option>
  ));

  const style = styles.map((style) => (
    <option
      key={style.g_num}
      value={style.g_num}
      price={style.g_pricePerWeight}
    >
      {style.g_styleName}
    </option>
  ));

  useEffect(() => {
    let result = [];
    for (let i = 0; i < excludedList.length; i++) {
      const hours = parseInt(excludedList[i].split(":")[0]);
      const minutes = parseInt(excludedList[i].split(":")[1]);
      result.push(setHours(setMinutes(new Date(), minutes), hours));
    }
    setExcludedTimes(result);

    console.log("result", result);
  }, [excludedList]);

  console.log(1, excludedList[0]);
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
            <select name="petNum">{pet}</select>
            <br />

            <label>Reserve the Date</label>
            <DatePicker
              closeOnScroll={true} // 스크롤 하면 선택box 닫히게
              selected={startDate} // 처음에 맨 위에 표시된 input에 나오는게 지금 날짜
              onChange={(date) => {
                setStartDate(date);

                const day = new Date(+date + 3240 * 10000)
                  .toISOString()
                  .replace("T", " ")
                  .replace(/\..*/, "");
                setR_visitDate(day);

                axios
                  .get("/api/reserve/timeCheck", {
                    params: { date: day },
                    headers: {
                      Authorization: localStorage.getItem("jwtToken"),
                    },
                  })
                  .then((data) => {
                    if (data.status === 200) {
                      setExcludedList(data.data);
                    }
                  });
              }} // 내가 선택한 날짜가 맨 위에 표시 됨
              showTimeSelect // 시간 나오게 하기
              excludeTimes={excludedTimes} //해당 시간 선택불가능하게 만들기
              timeFormat="HH:mm" //시간 포맷
              timeIntervals={30} // 15분 단위로 선택 가능한 box가 나옴
              timeCaption="time"
              dateFormat="yyyy-MM-dd HH:mm"
            />
            <br />
            <label>Grooming Style</label>
            <select
              name="g_num"
              onChange={(e) => {
                setPrice(e.target[e.target.value - 1].getAttribute("price"));
              }}
            >
              {style}
            </select>
            <br />
            <label>Price Per Weight</label>
            <input
              type="text"
              readOnly
              value={price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            />
            <br />
            <button>예약하기</button>
          </form>
        </fieldset>
      </div>
    </>
  );
}

export default Reservation;
