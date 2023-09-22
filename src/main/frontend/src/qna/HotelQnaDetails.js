import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function HotelQnaDetails(props) {
  const { hotelQnaNum } = useParams();
  const [boardDetails, setBoardDetails] = useState("");
  const [comment, setComment] = useState();

  const updateQna = () => {
    props.navi(`/updateQnaForm/hotel/${hotelQnaNum}`);
  };

  const deleteQna = () => {
    const bool = window.confirm("정말로 삭제하시겠습니까?");
    if (bool) {
      axios
        .post("/api/board/deleteHotelQna", boardDetails, props.axiosConfig)
        .then((data) => {
          if (data.status == 200) {
            alert("삭제되었습니다.");
            props.navi("/hotelQna");
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `/api/board/findHotelBoardDetails?hotelQnaNum=${hotelQnaNum}`,
        props.axiosConfig
      )
      .then((data) => {
        setBoardDetails(data.data);
        console.log("boarddata", data.data);
      });
  }, []);

  useEffect(() => {
    if (boardDetails?.answered) {
      axios
        .get(
          `/api/comment/findHotelBoardComment?hotelQnaNum=${hotelQnaNum}`,
          props.axiosConfig
        )
        .then((data) => {
          console.log("data", data.data);
          setComment(data.data);
        });
    }
  }, [boardDetails]);

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      hotelQnaComment: event.target.hotelQnaComment.value,
      hotelQnaNum: boardDetails.hotelQnaNum,
      customerNum: JSON.parse(localStorage.getItem("userInfo")).id,
    };
    axios
      .post("/api/comment/addHotelComment", body, props.axiosConfig)
      .then((data) => {
        if (data.status == 200) {
          alert("작성되었습니다.");
          setBoardDetails(data.data);
        }
      });
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
        <fieldset style={{ width: "100%" }}>
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
              <th style={{ minWidth: "50px" }}>{boardDetails.hotelQnaNum}</th>
              <th style={{ minWidth: "50px" }}>{boardDetails.hotelQnaTitle}</th>
              <th style={{ minWidth: "50px" }}>{boardDetails.customerName}</th>
              <th style={{ minWidth: "50px" }}>
                {boardDetails.answered ? "답변 완료" : "대기중"}
              </th>
              <th style={{ minWidth: "50px" }}>
                {new Date(boardDetails.hotelQnaRegDate).toLocaleString()}
              </th>
            </tr>
          </table>

          <textarea
            readOnly
            value={boardDetails.hotelQnaContent}
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
          <br />
          <br />

          {JSON.parse(localStorage.getItem("userInfo"))?.role == "ROLE_ADMIN" ||
          JSON.parse(localStorage.getItem("userInfo"))?.role ==
            "ROLE_MANAGER" ? (
            <form onSubmit={commentSubmitHandler}>
              <textarea
                name="hotelQnaComment"
                style={{
                  width: "100%",
                  marginBottom: "30px",
                  marginTop: "30px",
                  minHeight: "300px",
                }}
                readOnly={boardDetails.answered ? true : false}
                placeholder={boardDetails?.answered ? null : "답변 대기중"}
                defaultValue={
                  boardDetails.answered ? comment?.hotelQnaComment : null
                }
              ></textarea>
              <br />
              {boardDetails.answered ? null : (
                <Button
                  id="myHoverBtn"
                  style={{ float: "right" }}
                  type="submit"
                >
                  답변 작성
                </Button>
              )}
              <br />
            </form>
          ) : (
            <textarea
              readOnly
              style={{
                width: "100%",
                marginBottom: "30px",
                marginTop: "30px",
                minHeight: "300px",
              }}
            >
              {boardDetails.answered ? comment.hotelQnaComment : "대기중"}
            </textarea>
          )}
          <br />
          {boardDetails.customerNum ==
          JSON.parse(localStorage.getItem("userInfo")).id ? (
            <Button
              variant="secondary"
              onClick={deleteQna}
              style={{ float: "right", marginBottom: "30px" }}
            >
              삭제
            </Button>
          ) : null}
          {boardDetails.customerNum ==
            JSON.parse(localStorage.getItem("userInfo"))?.id &&
          boardDetails.answered == false ? (
            <div
              style={{
                float: "right",
                marginRight: "5px",
                marginBottom: "30px",
              }}
            >
              <Button variant="secondary" onClick={updateQna}>
                수정
              </Button>
            </div>
          ) : null}
        </fieldset>
      </div>
    </>
  );
}
export default HotelQnaDetails;
