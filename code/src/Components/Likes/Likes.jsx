import React, { useState } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";

import "./Likes.css";

const Likes = ({ articleId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useAuthState(auth);
  const handleLike = () => {
    if (user) {
      //make sure the user is signed in

      const likesRef = collection(db, "Likes"); //create reference to likes collection. Will create collection if it doesn't exist!
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then(() => setIsLiked(true))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>{isLiked ? <FaHeart /> : <FaRegHeart onClick={handleLike} />}</div>
  );
};

export default Likes;
