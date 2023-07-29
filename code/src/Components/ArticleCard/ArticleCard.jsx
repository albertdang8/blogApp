import React from 'react'
import './ArticleCard.css'

function ArticleCard({article}) {
  return (
    <div className="artivle-card">
      <img src={article?.imageUrl} alt="" />
      <div className="article-card-info">
        <p>{article?.title}</p>
        <p>Read</p>
      </div>
    </div>
  )
}

export default ArticleCard