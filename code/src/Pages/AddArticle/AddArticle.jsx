import React, { useState } from "react";.
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import "./AddArticle.css";

const AddArticle = () => {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    paragraphOne: "",
    paragraphTwo: "",
    paragraphThree: "",
    category: "",
    image: "",
  });

  return (
    <form className="add-article-form">
      <h2>Create Article</h2>
      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Maximum 100 characters"
          maxLength="100"
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          placeholder="Maximum 120 characters"
          maxLength="120"
          onChange={e => setFormData({ ...formData, summary: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphOne">Paragraph One</label>
        <textarea
          id="paragraphOne"
          placeholder="Maximum 650 characters"
          maxLength="650"
          onChange={e => setFormData({ ...formData, paragraphOne: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphTwo">Paragraph Two</label>
        <textarea
          id="paragraphTwo"
          placeholder="Maximum 650 characters"
          maxLength="650"
          onChange={e => setFormData({ ...formData, paragraphTwo: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphThree">Paragraph Three</label>
        <textarea
          id="paragraphThree"
          placeholder="Maximum 650 characters"
          maxLength="650"
          onChange={e => setFormData({ ...formData, paragraphThree: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select id="category" onChange={e => setFormData({ ...formData, category: e.target.value })}>
          <option value="">Select</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>Upload Image</label>
        <input type="file" name="image" accept="image/*" onChange={e => setFormData({ ...formData, image: e.target.files[0] })}/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddArticle;
