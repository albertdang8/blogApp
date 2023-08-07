import React, { useState, useEffect } from "react";
import { db, auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

import "./Comments.css";

const Comments = ({ articleId }) => {
  const [user] = useAuthState(auth);
  const [newComment, setNewComment] = useState("");

  const addNewComment = (e) => {
    e.preventDefault();
    const commentsRef = collection(db, "Comments");
    addDoc(commentsRef, {
      articleId: articleId,
      userId: user?.uid,
      content: newComment,
      username: user?.displayName,
    })
      .then(() => {
        toast("Comment submitted", {
          type: "success",
          autoClose: 2000,
        });
        setNewComment("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {user ? (
        <form onSubmit={addNewComment}>
          <input
            type="text"
            placeholder="Add comment..."
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </form>
      ) : (
        <p>Please log in to comment</p>
      )}
    </div>
  );
};

export default Comments;
