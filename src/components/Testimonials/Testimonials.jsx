import { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import API from "../../services/api";

import "./Testimonials.css";

function Testimonials() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews = async () => {

    try {

      const response =
        await API.get("/reviews");

      setReviews(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <section className="testimonials-section">

      <div className="container">

        <div className="section-title">

          <h2>
            What Our Clients Say
          </h2>

          <p>
            Real reviews from our happy clients
          </p>

        </div>

        <div className="reviews-grid">

          {reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <FaQuoteLeft
                className="quote-icon"
              />

              <div className="stars">

                {[...Array(review.rating)].map(
                  (_, index) => (

                    <FaStar
                      key={index}
                    />

                  )
                )}

              </div>

              <h3>
                {review.clientName}
              </h3>

              <p>
                {review.reviewText}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default Testimonials;