import { useState, useEffect } from "react";
import { FaUsers, FaTrash, FaPlus, FaTag, FaBuilding, FaPhone } from "react-icons/fa";

function ManageVendors() {
  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [category, setCategory] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(storedVendors);
  }, []);

  const addVendor = () => {
    if (!vendorName.trim() || !category.trim() || !mobile.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const newVendor = {
      id: Date.now(),
      vendorName: vendorName.trim(),
      category: category.trim(),
      mobile: mobile.trim()
    };

    const updatedVendors = [...vendors, newVendor];
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    
    setVendorName("");
    setCategory("");
    setMobile("");
  };

  const deleteVendor = (id) => {
    if (window.confirm("Delete this vendor?")) {
      const updatedVendors = vendors.filter(vendor => vendor.id !== id);
      setVendors(updatedVendors);
      localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaUsers className="text-pink-500 text-2xl" />
            <h1 className="text-2xl font-bold text-white">Manage Vendors</h1>
          </div>
          <p className="text-gray-500 text-sm">Add and manage your vendor partners</p>
        </div>

        {/* Add Form */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-5 mb-6">
          <h2 className="text-white font-semibold text-base mb-4">Add New Vendor</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Vendor Name</label>
              <div className="relative">
               
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-pink-500"
                  placeholder="Enter vendor name"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Category</label>
              <div className="relative">

                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-pink-500"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Mobile Number</label>
              <div className="relative">
                
                <input
                  type="tel"
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-pink-500"
                  placeholder="Enter 10-digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength="10"
                />
              </div>
            </div>
          </div>
          <button
            onClick={addVendor}
            className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-lg transition flex items-center gap-2"
          >
            <FaPlus size={12} /> Add Vendor
          </button>
        </div>

        {/* Vendors List */}
        {vendors.length === 0 ? (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
            <FaUsers className="text-gray-700 text-4xl mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No vendors added yet</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Vendor Name</th>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Mobile</th>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-white text-sm">{vendor.vendorName}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-pink-500/10 text-pink-400 rounded text-xs">{vendor.category}</span>
                      </td>
                      <td className="py-3 px-4">
                        <a href={`tel:${vendor.mobile}`} className="text-gray-300 text-sm hover:text-pink-400 transition">
                          {vendor.mobile}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteVendor(vendor.id)}
                          className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs transition flex items-center gap-1"
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageVendors;