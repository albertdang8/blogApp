import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../../config/firebaseConfig";
import { v4 } from "uuid";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import "./AddArticle.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    paragraphOne: "",
    paragraphTwo: "",
    paragraphThree: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //creating a reference for the image
    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);

    //upload the image to the bucket
    uploadBytes(imageRef, formData.image)
      .then((res) => {
        // console.log(res.ref);
        return getDownloadURL(res.ref); // Return the download URL promise
      })
      .then((url) => {
        console.log("this is the url", url);
        const articleRef = collection(db, "Articles");
        return addDoc(articleRef, {
          title: formData.title,
          summary: formData.summary,
          paragraphOne: formData.paragraphOne,
          paragraphTwo: formData.paragraphTwo,
          paragraphThree: formData.paragraphThree,
          category: formData.category,
          imageUrl: url,
          createdBy: user.displayName,
          userId: user.uid,
          createdAt: Timestamp.now().toDate(),
        });
      })
      .then(() => {
        // Success notification and navigation
        toast("Article saved successfully!", {
          type: "success",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="add-article-form" onSubmit={handleSubmit}>
      <h2>Create Article</h2>
      <div className="input-group">
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          id="title"
          placeholder="Maximum 100 characters"
          maxLength="100"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="summary">Summary</label>
        <textarea
          required
          id="summary"
          placeholder="Maximum 120 characters"
          maxLength="120"
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphOne">Paragraph One</label>
        <textarea
          required
          id="paragraphOne"
          placeholder="Maximum 650 characters"
          maxLength="650"
          onChange={(e) =>
            setFormData({ ...formData, paragraphOne: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphTwo">Paragraph Two</label>
        <textarea
          id="paragraphTwo"
          placeholder="Maximum 650 characters"
          maxLength="650"
          onChange={(e) =>
            setFormData({ ...formData, paragraphTwo: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="paragraphThree">Paragraph Three</label>
        <textarea
          id="paragraphThree"
          placeholder="Maximum 650 characters"
          maxLength="650"
          onChange={(e) =>
            setFormData({ ...formData, paragraphThree: e.target.value })
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select
          required
          id="category"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>Upload Image</label>
        <input
          required
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddArticle;
