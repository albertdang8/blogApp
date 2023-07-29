import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import "./Banner.css";

const Banner = () => {

  const [mainArticle, setMainArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);

  useEffect(() => {
    const articlesRef = collection(db, "Articles");
    const q = query(articlesRef, orderBy("createdAt", "desc"), limit(5));

    getDocs(q, articlesRef)
      .then((res) => {
        const articles = res.docs.map((item) => {
          return { id: item.id, ...item.data() };
        });
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log("Error: " + err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        key={mainArticle?.id}
        // onClick={()=>navigate(`/article/${mainArticle?.id}`)}
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
        </div>
      </div>
      <div className="other-articles-container">
        {otherArticles?.map((item) => (
          <div
            className="other-article-item"
            key={item?.id}
            // onClick={()=>navigate(`/article/${item?.id}`)}
            style={{ backgroundImage: `url(${item?.imageUrl})` }}
          >
            <div className="banner-info">
              <h3>{item?.title}</h3>
              <small>{item?.createdAt?.toDate().toDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Banner;
