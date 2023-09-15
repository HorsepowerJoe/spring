import axios from "axios";
import { useEffect, useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";

function FacebookFeed(props) {
  const [posts, setPosts] = useState([]);
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

  return <div className="facebook-feed">{post}</div>;
}

export default FacebookFeed;
