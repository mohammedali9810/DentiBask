import React from 'react';
import './Category.css';

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
    <div className='d-flex justify-content-center mt-3'>
      <ul className="nav nav-tabs">
      {categoriesList?.map((category, index) => (
        <li className="nav-item" key={index} onClick={() => updateCategory(category)}>
          <button style={{
            fontSize:'1.1rem',
          }} className="nav-link" href="#">{category}</button>
        </li>
      ))}
    </ul>
    </div>
  );
}
export default Category;

// import React, { useState } from 'react';
// import './Category.css'; // Import your custom CSS file for additional styles

// function Category({ updateCategory }) {
//   const categoriesList = [
//     "smartphones",
//     "laptops",
//     "skincare",
//     "groceries",
//     "home-decoration",
//     "automotive",
//   ];

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(categoriesList[0]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     updateCategory(category);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="category-dropdown">
//       <button
//         className="btn btn-secondary dropdown-toggle"
//         type="button"
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//       >
//         {selectedCategory}
//       </button>
//       {isDropdownOpen && (
//         <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//           {categoriesList.map((category, index) => (
//             <a
//               className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
//               href="#"
//               key={index}
//               onClick={() => handleCategoryChange(category)}
//             >
//               {category}
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Category;

// import React, { useState } from 'react';
// import './Category.css'; // Import your custom CSS file for additional styles

// function Category({ updateCategory }) {
//   const categoriesList = [
//     "smartphones",
//     "laptops",
//     "skincare",
//     "groceries",
//     "home-decoration",
//     "automotive",
//   ];

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(categoriesList[0]);

//   const handleCategoryChange = (category, event) => {
//     event.preventDefault(); // Prevent default behavior of the anchor tag
//     setSelectedCategory(category);
//     updateCategory(category);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className="category-dropdown">
//       <button
//         className="btn btn-secondary dropdown-toggle"
//         type="button"
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//       >
//         {selectedCategory}
//       </button>
//       {isDropdownOpen && (
//         <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//           {categoriesList.map((category, index) => (
//             // eslint-disable-next-line jsx-a11y/anchor-is-valid
//             <a
//               className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
//               href="#"
//               key={index}
//               onClick={(event) => handleCategoryChange(category, event)}>
//               {category}
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Category;
