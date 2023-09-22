import axios from "axios";
import { useEffect, useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";
import { Button } from "react-bootstrap";

function FacebookFeed(props) {
  const [posts, setPosts] = useState([]);
  const [isClose, setIsClose] = useState(false);
  useEffect(() => {
    axios.get("/api/getFeed").then((data) => {
      console.log(data.data.posts.data);
      setPosts(data.data.posts.data);
    });
  }, []);

  const post = posts.map((post) => (
    <div key={post.created_time} className="facebook-post">
      <div className="post-header">
        <img src={logoImg} alt="Profile" className="profile-image" />
        <div className="post-info">
          <span className="post-author">DOGE Center </span>
          <span className="post-time">
            {new Date(post.created_time).toLocaleString()}
          </span>
          {post.link ? (
            <a style={{ float: "right" }} href={post.link} target="_blank">
              이동
            </a>
          ) : null}
        </div>
      </div>
      {post?.source && (
        <video controls style={{ width: "100%" }}>
          <source src={post.source} type="video/mp4" />
        </video>
      )}
      {!post?.source && !post.attachments?.data && post?.full_picture && (
        <img
          src={post?.full_picture}
          alt="Post Image"
          className="post-image"
          style={{ maxWidth: "100%" }}
        />
      )}
      {post.attachments?.data?.[0]?.subattachments?.data?.map(
        (attachment, index) => (
          <img
            key={index}
            src={attachment.media?.image?.src}
            alt={`Attachment Image ${index}`}
            style={{ maxWidth: "100%", marginBottom: "10px" }}
          />
        )
      )}
      <div className="post-content">{post?.message}</div>
    </div>
  ));

  return (
    <>
      {isClose ? null : (
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            padding: "100px",
          }}
        >
          테스트용 어드민 계정입니다. <br /> ID : test@test.com <br /> PW : test
          <br />
          <br />
          테스트용 유저 계정입니다. <br /> ID : asdf@asdf.com <br /> PW : asdf{" "}
          <br />
          <br />
          <Button
            style={{ margin: "10px", width: "30%" }}
            variant="secondary"
            onClick={() => {
              setIsClose(true);
            }}
          >
            닫기
          </Button>
        </h1>
      )}
      <div className="facebook-feed">{post}</div>
    </>
  );
}

export default FacebookFeed;
