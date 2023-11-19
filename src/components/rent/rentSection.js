import React from "react";
import rentimage from "./rent.png";
import { useNavigate } from "react-router-dom";
const RentSection = () => {
  const navigate = useNavigate();
  return (
    <section className="rent-section" style={{marginTop:"2rem", marginBottom:"2rem"}}>
      <h1 className="text-center" style={{marginBottom:"2rem"}}>Other Services</h1>
      <div className="container d-flex justify-content-center">
        <div  style={{width:"100%", display:"flex",justifyContent:"space-around", alignItems:"center", height:"20rem"}}>
          <div style={{height:"100%", display:"flex", flexDirection:"column"}}>
            <p style={{fontSize:"1.5rem", fontWeight:"bold"}}>Rent Your Clinic</p>
            <img
              className="w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzoE58UHNNujtEpChBckj0Wd9JWoc1EHtsXyob1VaDugKXqLoJ8jvSnkrKadZY1IicWo&usqp=CAU"
              alt="Service 1"
              style={{height:"90%",objectFit:"contain", cursor:"pointer"}}
            />
            </div>
            <div  style={{height:"100%", display:"flex", flexDirection:"column"}}>
            <p style={{fontSize:"1.5rem", fontWeight:"bold"}}>Rent a Clinic</p>
            <img
              className="w-100"
              src={rentimage}
              alt="Service 2"
              style={{height:"100%",objectFit:"contain", cursor:"pointer"}}
              onClick={()=>{navigate("/rentpage")}}
            />
            </div>
        </div>
      </div>
    </section>
  );
};

export default RentSection;
