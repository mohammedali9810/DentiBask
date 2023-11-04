import React from 'react';

function Category({ updateCategory }) {
  const categoriesList = [
    "smartphones",
    "laptops",
    "skincare",
    "groceries",
    "home-decoration",
    "automotive",
  ];

  return (
    <ul className="nav nav-tabs">
      {categoriesList?.map((category, index) => (
        <li className="nav-item" key={index} onClick={() => updateCategory(category)}>
          <a className="nav-link" href="#">{category}</a>
        </li>
      ))}
    </ul>
  );
}

export default Category;
