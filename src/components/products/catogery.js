import React, { useState, useEffect } from "react";
import "./Category.css";
import axiosinstance from "../../axiosconfig";

function Category({ updateCategory }) {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    axiosinstance
      .get("/Products/get_categories/")
      .then((response) => {
        const data = response.data;
        const categories = data.map((category) => category.name);
        setCategoriesList(categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts

  return (
    <div className="d-flex justify-content-center mt-3">
      <ul className="nav nav-tabs">
        {categoriesList?.map((category, index) => (
          <li
            className="nav-item"
            key={index}
            onClick={() => updateCategory(category)}
          >
            <button
              style={{
                fontSize: "1.1rem",
              }}
              className="nav-link"
              href="#"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
