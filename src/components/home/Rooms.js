import React, { useState, useEffect } from "react";
import CommonHeading from "../common/CommonHeading";
import { facility, roomItems } from "../data/Data";
import "../../css/HotelBookingForm.css";
import axios from '../../axios';

export default function Rooms() {
  // State management for popups and reviews
  const [isPopupVisible, setPopupVisible] = useState(false); // Controls booking form visibility
  const [isReviewPopupVisible, setReviewPopupVisible] = useState(false); // Controls review form visibility
  const [isReviewListVisible, setReviewListVisible] = useState(false); // Controls review list visibility
  const [reviews, setReviews] = useState([]); // State to store submitted reviews
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: "",
    comments: "",
  });

  useEffect(() => {
    console.log('Fetching reviews...');
    
    axios.get('http://localhost:5033/api/Review/GetReviews')
      .then(response => {
        console.log('API response:', response.data); // Log the API response
        setReviews(response.data); // Update the reviews state with the data
      })
      .catch(error => {
        console.error('There was an error!', error); // Log the error if there’s an issue
      });
  }, []); // Add an empty array as a dependency
  
  // Functions to handle popup visibility
  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const openReviewPopup = () => setReviewPopupVisible(true);
  const closeReviewPopup = () => setReviewPopupVisible(false);
  const openReviewListPopup = () => setReviewListVisible(true);
  const closeReviewListPopup = () => setReviewListVisible(false);

  // Handle review form input changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value,
    });
  };

  // Submit review and reset form
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, reviewForm]); // Add new review to the list
    console.log(reviewForm); // Handle form submission
    if (reviewForm.id != null && reviewForm.id !== "") {
      axios.put(`http://localhost:5033/api/Review/UpdateReview/${reviewForm.id}`, reviewForm)
        .then(response => {
          if (response.status === 200) {
            alert("Review Updated Successfully");
          }
        })
        .catch(error => {
          console.error('There was an error!', error); // Log the error if there’s an issue
        });
    
      setReviewForm({ name: "", rating: "", comments: "" }); // Reset form
      closeReviewPopup(); // Close review popup
      return;
    }
    
    const response = axios.post('http://localhost:5033/api/Review/AddReview', reviewForm)
      .then(response => {
        console.log('API response:', response); // Log the API response
        if (response.status === 201) {
          alert("Review Added Successfully");
        }
      }).catch(error => {
        console.error('There was an error!', error); // Log the error if there’s an issue
      });
    setReviewForm({ name: "", rating: "", comments: "" }); // Reset form
    closeReviewPopup(); // Close review popup
  };

  // State for booking form data
  const [formData, setFormData] = useState({
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    roomType: "standard",
  });
  
  // Handle booking form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit booking form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission
  };

  // Handler for editing reviews
  const handleEdit = (review) => {
    setReviewForm(review); // Pre-fill the form with the review data for editing
  
    openReviewPopup(); // Open the review form popup
  };

// Handler for deleting reviews
const handleDelete = (id) => {
  axios.delete(`http://localhost:5033/api/Review/DeleteReview/${id}`)
    .then(response => {
      if (response.status === 200) {
        alert("Review Deleted Successfully");
        // Update the reviews state to reflect the deletion
        setReviews((prevReviews) => prevReviews.filter(review => review.id !== id));
      }
    })
    .catch(error => {
      console.error('There was an error!', error); // Log the error if there’s an issue
    });
    
  console.log('Deleted review with id:', id);
};


  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Hotels"
            title=""
            subtitle="Explore Our Recommendations"
          />
          <div className="row g-4">
            {roomItems.map((item, key) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
                key={key} // Key for mapping
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img
                      className="img-fluid"
                      src={item.img}
                      alt="Room"
                      style={{ width: "500px", height: "300px" }}
                    />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      {item.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{item.name}</h5>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="ps-2">{item.star}</div>
                        <a
                          href="#"
                          style={{ fontSize: "15px", textAlign: "center" }}
                          onClick={(e) => {
                            e.preventDefault();
                            openReviewListPopup(); // Open review list popup
                          }}
                        >
                          View Reviews
                        </a>
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      {facility.map((item, index) => (
                        <small className="border-end me-3 pe-3" key={index}>
                          {item.icon}
                          {item.quantity} {item.facility}
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3">{item.description}</p>
                    <div className="d-flex justify-content-between">
                      <a
                        className="btn btn-sm btn-primary rounded py-2 px-4"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openReviewPopup(); // Open review form popup
                        }}
                      >
                        Add Review
                      </a>
                      <a
                        className="btn btn-sm btn-dark rounded py-2 px-4"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openPopup(); // Open booking form popup
                        }}
                      >
                        {item.darkbtn}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Popup */}
          {isReviewPopupVisible && (
            <>
              <div className="popup-overlay"></div>
              <div className="review-popup">
                <h2 className="form-title">Add Review</h2>
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={reviewForm.name}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                      id="rating"
                      name="rating"
                      value={reviewForm.rating}
                      onChange={handleReviewChange}
                      required
                    >
                      <option value="">Choose rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Terrible</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="comments">Comments:</label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={reviewForm.comments}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={closeReviewPopup}
                    className="submit-btn"
                    style={{ backgroundColor: "gray", marginTop: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Review List Popup */}
          {isReviewListVisible && (
            <>
              <div className="popup-overlay"></div>
              <div className="review-popup">
                <h2 className="form-title">Reviews</h2>
                <div className="review-list" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                  {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <h5>{review.name}</h5>
                      <p>Rating: {review.rating} ⭐</p>
                      <p>{review.comments}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button 
                          onClick={() => handleEdit(review)} 
                          className="btn btn-warning" 
                          style={{ marginRight: '5px' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(review.id)} 
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={closeReviewListPopup}
                  className="submit-btn"
                  style={{ marginTop: "10px", backgroundColor: "gray" }}
                >
                  Close
                </button>
              </div>
            </>
          )}

          {/* Booking Form Popup */}
          {isPopupVisible && (
            <>
              <div className="popup-overlay"></div>
              <div className="booking-popup">
                <h2 className="form-title">Book Now</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="destination">Destination:</label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkInDate">Check-In Date:</label>
                    <input
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkOutDate">Check-Out Date:</label>
                    <input
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guests">Guests:</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="roomType">Room Type:</label>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      required
                    >
                      <option value="standard">Standard</option>
                      <option value="deluxe">Deluxe</option>
                      <option value="suite">Suite</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-btn">
                    Book Now
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="submit-btn"
                    style={{ backgroundColor: "gray", marginTop: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
