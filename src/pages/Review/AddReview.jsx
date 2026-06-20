import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import { FaStar, FaUser, FaQuoteLeft, FaCheckCircle, FaSpinner } from "react-icons/fa";

function AddReview() {
  const [clientName, setClientName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!clientName.trim()) {
      alert("Please enter your name");
      return;
    }
    
    if (!reviewText.trim()) {
      alert("Please enter your review");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await API.post("/reviews", {
        clientName: clientName.trim(),
        reviewText: reviewText.trim(),
        rating: Number(rating),
      });
      
      setShowSuccess(true);
      setClientName("");
      setReviewText("");
      setRating(5);
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingOptions = [
    { value: 5, label: "Excellent", emoji: "😍" },
    { value: 4, label: "Very Good", emoji: "😊" },
    { value: 3, label: "Good", emoji: "🙂" },
    { value: 2, label: "Fair", emoji: "😐" },
    { value: 1, label: "Poor", emoji: "😞" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-3xl opacity-10 animate-pulse delay-700"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-white text-xl" />
                <div>
                  <p className="text-white font-semibold">Review Submitted Successfully!</p>
                  <p className="text-white/80 text-sm">Thank you for sharing your experience</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-8 text-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-block"
            >
              <FaQuoteLeft className="text-white text-3xl mb-2 mx-auto" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2"
            >
              Share Your Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80"
            >
              Your feedback helps us improve and serve you better
            </motion.p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Client Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <FaUser className="text-pink-400" />
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
                placeholder="Enter your full name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                disabled={isSubmitting}
              />
            </motion.div>

            {/* Rating Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-white font-semibold mb-3">
                Rating
              </label>
              <div className="space-y-3">
                {/* Star Display */}
                <div className="flex gap-2 items-center">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    const isActive = starValue <= (hoveredRating || rating);
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoveredRating(starValue)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`transition-all duration-200 ${
                            isActive
                              ? "text-yellow-400 drop-shadow-glow"
                              : "text-gray-600"
                          }`}
                          size={32}
                        />
                      </motion.button>
                    );
                  })}
                  <motion.span
                    key={rating}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-3 text-white/80 text-sm"
                  >
                    {ratingOptions.find(opt => opt.value === rating)?.label}
                    {" "}
                    {ratingOptions.find(opt => opt.value === rating)?.emoji}
                  </motion.span>
                </div>
                
                {/* Rating Options */}
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {ratingOptions.map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => setRating(opt.value)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        rating === opt.value
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {opt.emoji} {opt.value}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Review Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <FaQuoteLeft className="text-pink-400" />
                Your Review
              </label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 resize-none"
                placeholder="Share your experience with us... What did you love about our service?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                disabled={isSubmitting}
              />
              <p className="text-white/40 text-xs mt-2">
                {reviewText.length} characters
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-pink-500/50"
                }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block"
                  >
                    <FaSpinner className="inline-block mr-2" />
                  </motion.div>
                ) : (
                  "Submit Review"
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.8));
        }
      `}</style>
    </div>
  );
}

export default AddReview;