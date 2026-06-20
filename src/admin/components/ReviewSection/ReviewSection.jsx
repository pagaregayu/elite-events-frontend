import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../services/api";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await API.get("/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="col-md-4 mb-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
        <div className="h-6 bg-white/20 rounded-lg w-3/4 mb-4"></div>
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-white/20 rounded"></div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/20 rounded w-full"></div>
          <div className="h-4 bg-white/20 rounded w-5/6"></div>
          <div className="h-4 bg-white/20 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2">
              <FaQuoteLeft className="text-white text-2xl" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            Real experiences from our valued customers
          </motion.p>
        </motion.div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="row">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="row"
          >
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="col-md-4 mb-4"
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                  layout
                >
                  <div className="relative group">
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                    
                    {/* Card Content */}
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-300 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <FaQuoteRight className="text-3xl text-white" />
                      </div>
                      
                      {/* Client Name */}
                      <motion.h4
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="text-xl font-bold text-white mb-3 pr-8"
                      >
                        {review.clientName}
                      </motion.h4>
                      
                      {/* Rating Stars with Animation */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                        className="flex gap-1 mb-4"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`transition-all duration-300 ${
                              i < review.rating
                                ? "text-yellow-400 drop-shadow-glow"
                                : "text-gray-600"
                            }`}
                            size={20}
                          />
                        ))}
                      </motion.div>
                      
                      {/* Review Text */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="text-gray-200 leading-relaxed flex-grow relative z-10"
                      >
                        <FaQuoteLeft className="inline-block text-gray-400 text-sm mr-1 opacity-50" />
                        {review.reviewText}
                        <FaQuoteRight className="inline-block text-gray-400 text-sm ml-1 opacity-50" />
                      </motion.p>
                      
                      {/* Decorative Line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "50px" }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                        className="h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-4"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full p-6 mb-4">
              <FaQuoteLeft className="text-4xl text-gray-400" />
            </div>
            <p className="text-gray-300 text-lg">No reviews yet. Be the first to share your experience!</p>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.6));
        }
      `}</style>
    </section>
  );
}

export default ReviewSection;