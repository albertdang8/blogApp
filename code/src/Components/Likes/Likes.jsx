import React, { useState, useEffect } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import "./Likes.css";

const Likes = ({ articleId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "Likes"); //create reference to likes collection. Will create collection if it doesn't exist!

  useEffect(() => {
    if (user) {
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      getDocs(q, likesRef)
        .then((res) => {
          if (res.size > 0) {
            setIsLiked(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLiked(false);
    }
  }, [user]);

  useEffect(()=> {
    //  find like count
    //  make a query to count likes
    const q2 = query(likesRef, where("articleId", "==", articleId))
    getDocs(q2, likesRef).then(res => setLikeCount(res.size)).catch(err => console.log(err));
  }, [isLiked])

  const handleLike = () => {
    if (user) {
      //make sure the user is signed in
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then(() => setIsLiked(true))
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = () => {
    if (user) {
      const likesRef = collection(db, "Likes");
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );
      getDocs(q, likesRef)
        .then((res) => {
          const likeId = res.docs[0].id;
          deleteDoc(doc(db, "Likes", likeId))
            .then(() => {
              setIsLiked(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {isLiked ? (
        <FaHeart onClick={handleUnlike} />
      ) : (
        <FaRegHeart onClick={handleLike} />
      )}
      <span> {likeCount}</span>
    </div>
  );
};

export default Likes;
