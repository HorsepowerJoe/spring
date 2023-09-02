import axios from "axios";
import { useEffect, useState } from "react";
import "./css/findReservationCss.css";
import { Button } from "react-bootstrap";

function FindReservation(props) {
  const [reservationList, setReservationList] = useState([]);
  const [eventCounter, setEventCounter] = useState(0);
  //예약 목록 불러와서
  useEffect(() => {
    const body = {
      customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
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
        <Button
          variant="secondary"
          onClick={(event) => {
            const r_num = event.target.parentElement.parentElement.className;
            const boolean = window.confirm(
              "방문 시간 1시간 이내에 예약을 취소하시면 추후 예약이 어려울 수 있습니다.\n예약을 취소하시겠습니까?"
            );

            if (boolean) {
              axios
                .post(
                  "/api/reserve/deleteReservation",
                  {
                    r_num: r_num,
                    customerNum: JSON.parse(localStorage.getItem("userInfo"))
                      ?.id,
                  },
                  props.axiosConfig
                )
                .then((data) => {
                  if (data.status == 200) {
                    setEventCounter(Math.random);
                    alert("취소되었습니다.");
                  }
                });
            }
          }}
        >
          취소
        </Button>
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
          <legend
            style={{
              textAlign: "center",
              backgroundColor: "lightgray",
              border: "1px solid black",
              borderBottom: "0px",
            }}
          >
            나의 미용 예약
          </legend>
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
