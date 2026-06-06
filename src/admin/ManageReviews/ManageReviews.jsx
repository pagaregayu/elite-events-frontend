import { useState,useEffect } from "react";

function ManageReviews(){

  const [reviews,setReviews] =
  useState([]);

  useEffect(()=>{

    const storedReviews =
      JSON.parse(
        localStorage.getItem("reviews")
      ) || [];

    setReviews(storedReviews);

  },[]);

  const deleteReview=(id)=>{

    const updatedReviews =
      reviews.filter(
        review => review.id !== id
      );

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );
  };

  return(

    <div className="container mt-4">

      <h2>Manage Reviews</h2>

      {reviews.map(review=>(

        <div
          key={review.id}
          className="card p-3 mb-3"
        >

          <h5>{review.name}</h5>

          <p>{review.comment}</p>

          <button
            className="btn btn-danger"
            onClick={()=>
              deleteReview(review.id)
            }
          >
            Delete Review
          </button>

        </div>

      ))}

    </div>

  );
}

export default ManageReviews;