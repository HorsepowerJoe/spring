import { useEffect, useState } from "react";
import axios from "axios";
import "./css/findReservationCss.css";

function FindReservation(props) {
  const [reservationList, setReservationList] = useState([]);
  const [eventCounter, setEventCounter] = useState(0);
  //예약 목록 불러와서
  useEffect(() => {
    const body = {
      customerNum: JSON.parse(localStorage.getItem("userInfo")).id,
    };

    axios
      .post("/api/reserve/findReservation", body, props.axiosConfig)
      .then((data) => {
        setReservationList(data.data);
      });
  }, [eventCounter]);

  const reserve = reservationList.map((r, i) => (
    <tr className={r.r_num}>
      <td>{i + 1}</td>
      <td>{r.r_num}</td>
      <td>{new Date(r.visitDate).toLocaleString().replace(". 오", " - 오")}</td>
      <td>{r.petName}</td>
      <td>{r.g_styleName}</td>
      <td>{r.g_pricePerWeight}</td>
      <td>{r.r_finalAmount}</td>
      <td>
        <button
          onClick={(event) => {
            const r_num = event.target.parentElement.parentElement.className;
            axios
              .post(
                "/api/reserve/deleteReservation",
                {
                  r_num: r_num,
                  customerNum: JSON.parse(localStorage.getItem("userInfo")).id,
                },
                props.axiosConfig
              )
              .then((data) => {
                if (data.status == 200) {
                  setEventCounter(Math.random);
                  alert("삭제되었습니다.");
                }
              });
          }}
        >
          취소
        </button>
      </td>
    </tr>
  ));

  //맵으로 처리하기

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
          <legend style={{ textAlign: "center" }}>나의 미용 예약</legend>
          <table
            className="bordered-table"
            style={{
              width: "800px",
              textAlign: "center",
            }}
          >
            <tr>
              <th style={{ minWidth: "50px" }}>번호</th>
              <th style={{ minWidth: "50px" }}>예약번호</th>
              <th style={{ minWidth: "50px" }}>방문 시간</th>
              <th style={{ minWidth: "50px" }}>애견 이름</th>
              <th style={{ minWidth: "50px" }}>미용 종류</th>
              <th style={{ minWidth: "50px" }}>Kg당 가격</th>
              <th style={{ minWidth: "50px" }}>최종 금액</th>
              <th style={{ minWidth: "50px" }}>예약 취소</th>
            </tr>
            {reserve}
          </table>
        </fieldset>
      </div>
    </>
  );
}

export default FindReservation;
