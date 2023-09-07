import axios from "axios";
import { useEffect, useState } from "react";

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
    <div
      style={{
        border: "1px solid black",
        textAlign: "center",
        width: "50%",
        margin: "0 auto",
      }}
    >
      <div key={post.created_time}>
        {new Date(post.created_time).toLocaleString()}
      </div>
      <img src={post?.full_picture}></img>
      <br />
      <div>{post?.message}</div>
    </div>
  ));

  return <>{post}</>;
}

export default FacebookFeed;
