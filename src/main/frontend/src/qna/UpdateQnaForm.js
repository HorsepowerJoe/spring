import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateQnaForm = (props) => {
  const [boardDetails, setBoardDetails] = useState([]);
  const { category, num } = useParams();

  useEffect(() => {
    axios
      .get(
        `/api/board/${
          category == "grooming"
            ? "findGroomingBoardDetails"
            : "findHotelBoardDetails"
        }?${category == "grooming" ? "grooming" : "hotel"}QnaNum=${num}`,
        props.axiosConfig
      )
      .then((data) => {
        setBoardDetails(data.data);
      });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body =
      category == "grooming"
        ? {
            customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
            groomingQnaNum: boardDetails.groomingQnaNum,
            groomingQnaTitle: event.target.qnaTitle.value,
            groomingQnaContent: event.target.qnaContent.value,
          }
        : {
            customerNum: JSON.parse(localStorage.getItem("userInfo"))?.id,
            hotelQnaNum: boardDetails.hotelQnaNum,
            hotelQnaTitle: event.target.qnaTitle.value,
            hotelQnaContent: event.target.qnaContent.value,
          };
    axios
      .post(
        `/api/board/update${category == "grooming" ? "Grooming" : "Hotel"}Qna`,
        body,
        props.axiosConfig
      )
      .then((data) => {
        if (data.status == 200) {
          alert("수정되었습니다.");
          window.history.back();
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
        <fieldset>
          <legend
            style={{
              textAlign: "center",
              backgroundColor: "lightgray",
              border: "1px solid black",
              borderBottom: "0",
            }}
          >
            미용 문의 수정
          </legend>
          <form
            style={{ display: "flex", flexDirection: "column", margin: "10px" }}
            onSubmit={onSubmitHandler}
          >
            <label style={{ textAlign: "center" }}>제목</label>
            <input
              name="qnaTitle"
              type="text"
              defaultValue={
                category == "grooming"
                  ? boardDetails?.groomingQnaContent
                  : boardDetails?.hotelQnaContent
              }
            />
            <br />
            <label style={{ textAlign: "center" }}>내용</label>
            <textarea
              name="qnaContent"
              defaultValue={
                category == "grooming"
                  ? boardDetails?.groomingQnaContent
                  : boardDetails?.hotelQnaContent
              }
              style={{ width: "800px", minHeight: "300px" }}
            />
            <br />
            <button
              id="myHoverBtn"
              style={{ borderRadius: "5px", height: "25px" }}
            >
              수정
            </button>
          </form>
        </fieldset>
      </div>
    </>
  );
};
export default UpdateQnaForm;
