import React from "react";
import {BsStarFill,BsStarHalf,BsStar} from "react-icons/bs"

function Rating(props) {{
    const stars = [];
    
    // Calculate the rating of full stars
    const fullStars = Math.floor(props.rating);
  
    // Calculate the remaining fraction
    const remaining = props.rating - fullStars;
  
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`star-${i}`} />);
    }
  
    // Add a half star if the remaining fraction is more than or equal to 0.5
    if (remaining >= 0.5) {
      stars.push(<BsStarHalf key="half-star" />);
    }
  
    // Add empty stars for the remaining to reach 5
    const emptyStarsCount = 5 - stars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<BsStar key={`empty-star-${i}`} style={{ opacity: 0.3 }} />);
    }
  
    return <div>{stars}</div>;
  };
}

export default Rating;
