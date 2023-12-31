import axios from "axios";
import "../reservation/css/findReservationCss.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function MyPet(props) {
  const [pets, setPets] = useState([]);
  const [eventCounter, setEventCounter] = useState(0);

  const axiosConfig = {
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .post(
        "/api/user/viewPet",
        { customerNum: userInfo?.id, username: userInfo?.username },
        axiosConfig
      )
      .then((data) => {
        if (data.status == 200) {
          setPets(JSON.parse(JSON.stringify(data.data)));
          console.log(data.data);
        } else {
          alert("불러오기에 실패하였습니다.");
        }
      });
  }, [eventCounter]);

  const pet = pets.map((ele) => (
    <tr key={ele.petNum} className={ele.petNum}>
      <td>{ele.petName}</td>
      <td>{ele.petBreed}</td>
      <td>{ele.petAge}</td>
      <td>{ele.petWeight}kg</td>
      <td>{ele.petSnitchy ? "있음" : "없음"}</td>
      <td>{ele.petNeutered ? "하였음" : "하지않음"}</td>
      <td>{ele.extraData}</td>
      <td>
        <Button
          variant="secondary"
          onClick={(event) => {
            const petNum = event.target.parentElement.parentElement.className;
            axios
              .post(
                "/api/user/deletePet",
                {
                  petNum: petNum,
                  customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
                },
                axiosConfig
              )
              .then((data) => {
                if (data.status == 200) {
                  setEventCounter(Math.random);
                  alert("삭제되었습니다.");
                }
              });
          }}
        >
          삭제
        </Button>
      </td>
    </tr>
  ));

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
        <fieldset style={{ width: "100%" }}>
          <legend
            style={{
              textAlign: "center",
              border: "1px solid black",
              borderBottom: "0px",
              backgroundColor: "lightgray",
            }}
          >
            나의 애견
          </legend>
          <table
            className="bordered-table"
            style={{
              textAlign: "center",
            }}
          >
            <tr>
              <th>이름</th>
              <th>견종</th>
              <th>나이</th>
              <th>체중</th>
              <th>입질</th>
              <th>중성화</th>
              <th>기타</th>
              <th>삭제</th>
            </tr>
            {pet}
          </table>
        </fieldset>
      </div>
    </>
  );
}

export default MyPet;
