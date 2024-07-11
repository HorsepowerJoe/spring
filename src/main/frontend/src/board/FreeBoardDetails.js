import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../qna/css/groomingQna.css";

function FreeBoardDetails(props) {
  const { freeBoardNum } = useParams();
  const [boardDetails, setBoardDetails] = useState("");
  const [replies, setReplies] = useState([]);

  const updateBoard = () => {
    props.navi(`/updateFreeBoardForm/${freeBoardNum}`);
  };

  const deleteBoard = () => {
    const bool = window.confirm("정말로 삭제하시겠습니까?");
    if (bool) {
      axios
        .post("/api/board/deleteFreeBoard", boardDetails, props.axiosConfig)
        .then((data) => {
          if (data.status == 200) {
            alert("삭제되었습니다.");
            props.navi("/freeBoard");
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `/api/board/findFreeBoardDetails?freeBoardNum=${freeBoardNum}`,
        props.axiosConfig
      )
      .then((data) => {
        setBoardDetails(data.data);
      });
  }, []);

  useEffect(() => {
    if (boardDetails?.freeBoardReplyCount > 0) {
      axios
        .get(
          `/api/comment/findFreeBoardReply?freeBoardNum=${freeBoardNum}`,
          props.axiosConfig
        )
        .then((data) => {
          console.log("data", data.data);
          setReplies(data.data);
        });
    }
  }, [boardDetails]);

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      freeBoardReply: event.target.freeBoardReply.value,
      freeBoardNum: boardDetails.freeBoardNum,
      freeBoardReplyName: event.target.freeBoardReplyName.value,
    };
    axios
      .post("/api/comment/addFreeBoardReply", body, props.axiosConfig)
      .then((data) => {
        if (data.status == 200) {
          setBoardDetails(data.data);
          window.location.reload();
        }
      });
  };

  const ReplyList = ({ replies }) => {
    return (
      <div>
        <ul className="comment-list">
          {replies.map((reply) => (
            <li key={reply.freeBoardReplyNum}>
              <span className="author">{reply.freeBoardReplyName}</span> |{" "}
              <span className="date">
                {new Date(reply.freeBoardReplyDate).toLocaleString()}
              </span>
              <br />
              {reply.freeBoardReply}
            </li>
          ))}
        </ul>
      </div>
    );
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
            자유 게시판
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
              <th style={{ minWidth: "50px" }}>댓글수</th>
              <th style={{ minWidth: "50px" }}>작성일</th>
            </tr>
            <tr>
              <th style={{ minWidth: "50px" }}>{boardDetails.freeBoardNum}</th>
              <th style={{ minWidth: "50px" }}>
                {boardDetails.freeBoardTitle}
              </th>
              <th style={{ minWidth: "50px" }}>{boardDetails.customerName}</th>
              <th style={{ minWidth: "50px" }}>
                {boardDetails?.freeBoardReplyCount > 0
                  ? boardDetails.freeBoardReplyCount
                  : "0"}
              </th>
              <th style={{ minWidth: "50px" }}>
                {new Date(boardDetails.freeBoardRegDate).toLocaleString()}
              </th>
            </tr>
          </table>
          <textarea
            readOnly
            value={boardDetails.freeBoardContent}
            style={{
              width: "100%",
              marginBottom: "30px",
              marginTop: "30px",
              minHeight: "150px",
            }}
          ></textarea>
          <hr />
          <legend
            style={{
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Reply
          </legend>
          <br />
          <br />
          <form onSubmit={commentSubmitHandler}>
            <input
              type="text"
              className="freeBoardReplyName"
              name="freeBoardReplyName"
              placeholder="닉네임"
            />
            <textarea
              id="commentInput"
              name="freeBoardReply"
              style={{
                width: "100%",
                marginBottom: "30px",
                marginTop: "30px",
                minHeight: "150px",
              }}
              placeholder={"리플을 입력하세요."}
            ></textarea>
            <br />

            <Button
              id="myHoverBtn"
              className="commentSubmit"
              style={{ float: "right", zIndex: 9999 }}
              type="submit"
            >
              리플 작성
            </Button>

            <br />
          </form>
          <br />
          <ReplyList replies={replies} />
        </fieldset>
      </div>
    </>
  );
}
export default FreeBoardDetails;
