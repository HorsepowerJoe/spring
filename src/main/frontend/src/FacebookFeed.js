import axios from "axios";
import { useEffect, useState } from "react";

function FacebookFeed(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://graph.facebook.com/v17.0/me?fields=posts%7Bfull_picture%2Ccreated_time%2Cmessage%7D%2Cphotos&access_token=EAAs5y8RCcF0BO7JZBhZBG54Icu0KitQdzZBV5LVjdKshc8O6uZA6Cz9a28oWGANjbJnAHR5XdLwqPEAxqkN3PZAO7kQUXVqRumTuSS6yVfhd3wAJtCx9gZBY8mzrONPTEJT3WaU0nDmDtcTRzPzaNIoh3lIHPy8CTITmDfgwEtTVztZBS4DIMq6eL6selrLQZCwoKeBbkViu03r90HLcNKc4IESKeuagGNww7HxpMm19zJbmYnSlknuPPCSz9GTpfVzVBZBZCZC3QZDZD"
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
