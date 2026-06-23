
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../services/api";
import { 
  FaImage, 
  FaUpload, 
  FaTimes, 
  FaCheckCircle,
  FaSpinner,
  FaTag,
  FaFolder,
  FaFileImage,
  FaVideo
} from "react-icons/fa";

function AdminAddGallery() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  const categories = [
    "Wedding",
    "Corporate",
    "Birthday",
    "Anniversary",
    "Concert",
    "Private Party",
    "Award Ceremony",
    "Other"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Check file type
      const isVideo = selectedFile.type.startsWith("video/");
      const isImage = selectedFile.type.startsWith("image/");
      
      if (isVideo) {
        setFileType("video");
        const videoURL = URL.createObjectURL(selectedFile);
        setPreview(videoURL);
      } else if (isImage) {
        setFileType("image");
        const imageURL = URL.createObjectURL(selectedFile);
        setPreview(imageURL);
      } else {
        setError("Please select an image or video file");
        setFile(null);
        setPreview(null);
        setFileType(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setFileType(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };


  const fetchGallery = async () => {
  try {
    const response = await API.get("/gallery");
    setGalleryItems(response.data);
  } catch (error) {
    console.error("Error fetching gallery:", error);
  } finally {
    setLoadingGallery(false);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/gallery/${id}`);

    setGalleryItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    alert("Deleted Successfully");
  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }
};

useEffect(() => {
  fetchGallery();
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !category || !file) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file);

    try {
      await API.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      await fetchGallery(); 

      setSuccess(true);
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setFileType(null);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const previewVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02 }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-pink-500/10 rounded-xl">
                <FaImage className="text-pink-500 text-xl" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Add Gallery Item
              </h1>
            </div>
            <p className="text-gray-400 text-sm">
              Upload images or videos to showcase your work
            </p>
          </motion.div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
            >
              <FaCheckCircle className="text-green-500 text-lg" />
              <div>
                <p className="text-green-500 font-medium">Success!</p>
                <p className="text-green-400 text-sm">Gallery item added successfully</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
            >
              <FaTimes className="text-red-500 text-lg" />
              <div>
                <p className="text-red-500 font-medium">Error!</p>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Title Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                <FaTag className="text-pink-500 text-xs" />
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter gallery item title"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                required
              />
            </motion.div>

            {/* Category Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                <FaFolder className="text-pink-500 text-xs" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all cursor-pointer"
                required
              >
                <option value="" className="bg-gray-900">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* File Upload Area */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                {fileType === "video" ? (
                  <FaVideo className="text-pink-500 text-xs" />
                ) : (
                  <FaFileImage className="text-pink-500 text-xs" />
                )}
                Media File (Image or Video)
              </label>
              
              {!preview ? (
                <label className="block">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-700 rounded-xl bg-gray-900/50 hover:border-pink-500 hover:bg-gray-900 transition-all cursor-pointer group">
                      <div className="p-3 bg-gray-800 rounded-full group-hover:bg-pink-500/20 transition-all">
                        <FaUpload className="text-gray-400 group-hover:text-pink-500 text-2xl transition-all" />
                      </div>
                      <p className="mt-3 text-gray-400 text-sm">
                        Click or drag to upload
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        PNG, JPG, MP4, WebM (Max 10MB)
                      </p>
                    </div>
                  </div>
                </label>
              ) : (
                <motion.div
                  variants={previewVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900"
                >
                  {fileType === "video" ? (
                    <video
                      src={preview}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-all"
                    >
                      <FaTimes className="text-white" />
                    </button>
                  </div>
                  
                  {/* File Type Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded-lg">
                    {fileType === "video" ? (
                      <span className="text-pink-400 text-xs flex items-center gap-1">
                        <FaVideo size={10} /> Video
                      </span>
                    ) : (
                      <span className="text-pink-400 text-xs flex items-center gap-1">
                        <FaFileImage size={10} /> Image
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <FaSpinner />
                    </motion.div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload />
                    Upload to Gallery
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <FaImage className="text-pink-500" />
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">Gallery Guidelines</p>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Supported formats: JPG, PNG, MP4, WebM</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Recommended image size: 1920x1080px</li>
                  <li>• Videos will be displayed in the gallery</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Gallery Items */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="mt-10"
>
  <h2 className="text-2xl font-bold text-white mb-6">
    Uploaded Gallery Items
  </h2>

  {loadingGallery ? (
    <div className="text-center text-gray-400">
      Loading Gallery...
    </div>
  ) : galleryItems.length === 0 ? (
    <div className="text-center text-gray-500">
      No Gallery Items Found
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
        >
          <img
            src={item.mediaUrl}
            alt={item.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h3 className="text-white font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm">
              {item.category}
            </p>

            <button
              onClick={() => handleDelete(item.id)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddGallery;