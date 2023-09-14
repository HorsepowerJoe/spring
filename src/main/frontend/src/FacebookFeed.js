import axios from "axios";
import { useEffect, useState } from "react";
import logoImg from "/Users/jml/Documents/vscode/spring/src/main/frontend/src/img/logo/logo.png";

function FacebookFeed(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://graph.facebook.com/v17.0/me?fields=posts%7Bfull_picture%2Ccreated_time%2Cmessage%7D%2Cphotos&access_token=EAAs5y8RCcF0BO6auZCzLwQECZCFgBfBVUOybZBejrrd5HHXrHwTXRa3ytnmx1UOkXidiHYgZAlxMKZBgfnWmUSlwbyLrv5WrsqLAxKwttYlppZASgf1ICc3W8YkDHdC6tONSXdUty9nPSP32zTZBGOHMrXE3ZCBk5RAoZBcPQGBoOAJ8fFw6EiwzoGT069aQAk1Af"
      )

      .then((data) => {
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
        </div>
      </div>
      {post?.full_picture && (
        <img
          src={post?.full_picture}
          alt="Post Image"
          className="post-image"
          style={{ maxWidth: "100%" }}
        />
      )}
      <div className="post-content">{post?.message}</div>
    </div>
  ));

  return <div className="facebook-feed">{post}</div>;
}

export default FacebookFeed;
