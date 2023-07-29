import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

import "./CategoryArticle.css";
import ArticleCard from "../../Components/ArticleCard/ArticleCard";

function CategoryArticle() {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");

    const q = query(articleRef, where("category", "==", categoryName));

    getDocs(q, articleRef).then((res) => {
      const articles = res.docs.map((item) => {
        return {
          id: item?.id,
          ...item?.data(),
        };
      });
      setArticles(articles);
    });
  }, [categoryName]);

  return (
    <div className="category-articles">
      {articles.length === 0 ? (
        <p>No articles</p>
      ) : (
        articles?.map((article) => <ArticleCard article={article} />)
      )}
    </div>
  );
}

export default CategoryArticle;
