import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { setHours, setMinutes, setSeconds } from "date-fns";
import axios from "axios";

function Reservation(props) {
  const [startDate, setStartDate] = useState(
    setSeconds(setHours(setMinutes(new Date(), 0), 10), 0)
  );
  const [excludedTimes, setExcludedTimes] = useState("");
  const [excludedList, setExcludedList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [styles, setStyles] = useState([]);
  const [price, setPrice] = useState("");
  const [pickStyle, setPickStyle] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [petWeight, setPetWeight] = useState(0);
  const [petName, setPetName] = useState("");
  const [amountPrice, setAmountPrice] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const booleanCase = () => {
      console.log("작동!");
      for (let i = 0; i < excludedTimes.length; i++) {
        if (excludedTimes[i].getHours() == new Date(visitDate).getHours()) {
          console.log("같아요!!");
          return false;
        }
      }
      console.log("같지 않아요!!");
      return true;
    };

    const boolean =
      booleanCase() &&
      new Date(visitDate).getHours() % 2 == 0 &&
      new Date(visitDate).getMinutes() == 0 &&
      10 <= new Date(visitDate).getHours() &&
      new Date(visitDate).getHours() < 20;

    console.log("", boolean);

    if (!boolean) {
      alert("해당 시간은 예약 할 수 없습니다. 다시 확인해주세요.");
    } else {
      const body = {
        visitDate: visitDate,
        petNum: event.target.petNum.value.split(",")[0],
        customerNum: props.userInfo?.id,
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
    }
  };

  useEffect(() => {
    axios
      .post(
        "/api/user/viewPet",
        { customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id },
        props.axiosConfig
      )
      .then((data) => {
        setPetList(JSON.parse(JSON.stringify(data.data)));
      });

    axios.get("/api/grooming/getStyles", props.axiosConfig).then((data) => {
      setStyles(JSON.parse(JSON.stringify(data.data)));
    });

    const day = new Date().toISOString().replace("T", " ").replace(/\..*/, "");

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
  }, []);

  const pet = petList.map((pet, index) => (
    <option
      key={pet.petNum}
      value={pet.petNum + "," + index}
      weight={pet.petWeight}
    >
      {pet.petName}
    </option>
  ));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

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

      result.push(
        setSeconds(setHours(setMinutes(new Date(startDate), minutes), hours), 0)
      );
      console.log("result", result);
      console.log("");
    }
    setExcludedTimes(result);
  }, [excludedList]);

  const filterPassedTime = (time) => {
    const hours = time.getHours();
    return !(hours >= 0 && hours < 9) && !(hours >= 20 && hours <= 23);
  };

  const nameChangeHandler = (event) => {
    setPetName(
      event.target[event.target.value.split(",")[1] - "" + 1].getAttribute(
        "weight"
      )
    );
  };

  useEffect(() => {
    console.log(petName);
    setPetWeight(petName);
    setPrice(pickStyle);
  }, [petName, pickStyle]);

  useEffect(() => {
    setAmountPrice(price * petWeight);
  }, [petWeight, price]);

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
            <select name="petNum" onChange={nameChangeHandler}>
              <option disabled selected>
                미용하실 애견을 선택해주세요.
              </option>
              {pet}
            </select>
            <label>Pet Weight</label>
            <input
              type="text"
              value={petWeight + "kg"}
              name="petWeight"
            ></input>
            <br />

            <label>Reserve the Date</label>
            <DatePicker
              closeOnScroll={true} // 스크롤 하면 선택box 닫히게
              selected={startDate} // 처음에 맨 위에 표시된 input에 나오는게 지금 날짜
              onChange={(date) => {
                setStartDate(date);

                handleDateChange(date);

                const day = new Date(+date + 3240 * 10000)
                  .toISOString()
                  .replace("T", " ")
                  .replace(/\..*/, "");
                setVisitDate(day);

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
              timeIntervals={120} // 15분 단위로 선택 가능한 box가 나옴
              timeCaption="time"
              minDate={today}
              // minTime={new Date().setHours(10, 0)}  섹시하지
              // maxTime={new Date().setHours(19, 59)} 않음
              filterTime={filterPassedTime}
              dateFormat="yyyy-MM-dd HH:mm"
              onSelect={(date) => setStartDate(date)}
            />
            <br />
            <label>Grooming Style</label>
            <select
              name="g_num"
              onChange={(e) => {
                setPickStyle(e.target[e.target.value].getAttribute("price"));
              }}
            >
              <option disabled selected>
                미용 스타일을 선택해주세요.
              </option>
              {style}
            </select>
            <br />
            <label>Price Per Weight</label>
            <input
              type="text"
              readOnly
              value={price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            />
            <label>Amount Price</label>
            <input
              type="text"
              readOnly
              value={("" + amountPrice).replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ","
              )}
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
