import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GroomingQnaDetails(props) {
  const { groomingQnaNum } = useParams();
  const [boardDetails, setBoardDetails] = useState("");
  useEffect(() => {
    axios
      .get(
        `/api/board/findBoardDetails?groomingQnaNum=${groomingQnaNum}`,
        props.axiosConfig
      )
      .then((data) => {
        setBoardDetails(data.data);
      });
  }, []);

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
          <legend style={{ textAlign: "center" }}>미용 문의</legend>
          <table
            style={{
              width: "800px",
              textAlign: "center",
              margin: "30px 0 30px 0",
            }}
          >
            <tr>
              <th style={{ minWidth: "50px" }}>번호</th>
              <th style={{ minWidth: "50px" }}>제목</th>
              <th style={{ minWidth: "50px" }}>작성자</th>
              <th style={{ minWidth: "50px" }}>답변</th>
              <th style={{ minWidth: "50px" }}>작성일</th>
            </tr>
            <tr>
              <th style={{ minWidth: "50px" }}>
                {boardDetails.groomingQnaNum}
              </th>
              <th style={{ minWidth: "50px" }}>
                {boardDetails.groomingQnaTitle}
              </th>
              <th style={{ minWidth: "50px" }}>{boardDetails.customerName}</th>
              <th style={{ minWidth: "50px" }}>
                {boardDetails.isAnswered ? "답변 완료" : "대기중"}
              </th>
              <th style={{ minWidth: "50px" }}>
                {new Date(boardDetails.groomingQnaRegDate).toLocaleString()}
              </th>
            </tr>
          </table>
          <hr />
          <textarea
            readOnly
            value={boardDetails.groomingQnaContent}
            style={{
              width: "100%",
              marginBottom: "30px",
              marginTop: "30px",
              minHeight: "300px",
            }}
          ></textarea>
          <hr />
          <legend
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Answer
          </legend>
          <textarea
            readOnly
            style={{ width: "800px", minHeight: "300px", marginBottom: "30px" }}
          >
            {boardDetails.isAnswered ? "답변 완료" : "대기중"}
          </textarea>
        </fieldset>
      </div>
    </>
  );
}
export default GroomingQnaDetails;
