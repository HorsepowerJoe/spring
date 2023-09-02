import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function GroomingQnaDetails(props) {
  const { groomingQnaNum } = useParams();
  const [boardDetails, setBoardDetails] = useState("");
  useEffect(() => {
    axios
      .get(
        `/api/board/findGroomingBoardDetails?groomingQnaNum=${groomingQnaNum}`,
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
          <legend
            style={{
              textAlign: "center",
              backgroundColor: "lightgray",
              border: "1px solid black",
              borderBottom: "0",
            }}
          >
            미용 문의
          </legend>
          <table
            style={{
              width: "100%",
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

          <legend
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Answer
          </legend>
          <hr />
          <textarea
            readOnly
            style={{ width: "800px", minHeight: "300px", marginBottom: "30px" }}
          >
            {boardDetails.isAnswered ? "답변 완료" : "대기중"}
          </textarea>
          <br />
          {boardDetails.customerNum ==
          JSON.parse(localStorage.getItem("userInfo"))?.id ? (
            <div style={{ float: "right", marginBottom: "30px" }}>
              <Button variant="secondary" style={{ marginRight: "5px" }}>
                수정
              </Button>
              <Button variant="secondary">삭제</Button>
            </div>
          ) : null}
        </fieldset>
      </div>
    </>
  );
}
export default GroomingQnaDetails;
