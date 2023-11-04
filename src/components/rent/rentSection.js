import React from "react";

const RentSection = () => {
  return (
    <section className="rent-section">
      <h1 className="text-center">Other Services</h1>
      <div className="container d-flex justify-content-center">
        <div className="row mx-5">
          <div className="col-5">
            <img
              className="w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzoE58UHNNujtEpChBckj0Wd9JWoc1EHtsXyob1VaDugKXqLoJ8jvSnkrKadZY1IicWo&usqp=CAU"
              alt="Service 1"
            />
          </div>
          <div className="col-5">
            <img
              className="w-100"
              src="https://media.istockphoto.com/id/492519338/vector/for-rent-sign-hanging-isolated-on-white-wall.jpg?s=612x612&w=0&k=20&c=gk4UhrjDZeN8nJvxZNkDkXZwPbVJPtMP-rxtZYveh9g="
              alt="Service 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentSection;
