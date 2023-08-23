import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function MyPet(props) {
  const [pets, setPets] = useState([]);

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
        { customerNum: userInfo.id, username: userInfo.username },
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
  }, []);

  const pet = pets.map((e) => (
    <tr key={e.petNum}>
      <td>{e.petName}</td>
      <td>{e.petBreed}</td>
      <td>{e.petAge}</td>
      <td>{e.petWeight}</td>
      <td>{e.petSnitchy ? "있음" : "없음"}</td>
      <td>{e.extraData}</td>
      <td>
        <button>수정</button>
      </td>
      <td>
        <button>삭제</button>
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
        <fieldset>
          <legend style={{ textAlign: "center" }}>나의 애견</legend>
          <table style={{ width: "800px", textAlign: "center" }}>
            <tr>
              <th style={{ minWidth: "50px" }}>이름</th>
              <th style={{ minWidth: "50px" }}>견종</th>
              <th style={{ minWidth: "50px" }}>나이</th>
              <th style={{ minWidth: "50px" }}>체중</th>
              <th style={{ minWidth: "50px" }}>입질</th>
              <th style={{ minWidth: "50px" }}>기타</th>
            </tr>
            {pet}
          </table>
        </fieldset>
      </div>
    </>
  );
}

export default MyPet;
