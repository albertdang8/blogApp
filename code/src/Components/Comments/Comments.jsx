import React, { useState, useEffect } from "react";
import { db, auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import "./Comments.css";

const Comments = ({ articleId }) => {
  const [user] = useAuthState(auth);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = collection(db, "Comments");

    const q = query(commentsRef, where("articleId", "==", articleId));

    onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((item) => {
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setComments(comments);
    });
  }, []);

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

  const deleteComment = (id) => {
    deleteDoc(doc(db, "Comments", id))
      .then(() => {
        toast("Comment deleted successfully", {
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="comments-container">
        {comments.map((item) => (
          <div className="comment" key={item.id}>
            <p>
              <span>{item.username}</span>
              {item.content}
            </p>
            {user?.uid === item.userId && (
              <button onClick={() => deleteComment(item.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
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
