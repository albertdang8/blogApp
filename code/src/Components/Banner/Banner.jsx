import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import "./Banner.css";

const Banner = () => {
  useEffect(() => {
    const articlesRef = collection(db, "Articles");

    getDocs(articlesRef)
      .then((res) => {
        const articles = res.docs.map((item) => {
          return { id: item.id, ...item.data() };
        });
      })
      .catch((err) => console.log("Error: " + err));
  }, []);

  return <div>Banner</div>;
};

export default Banner;
