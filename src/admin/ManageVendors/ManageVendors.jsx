import { useState, useEffect } from "react";

function ManageVendors() {

  const [vendors, setVendors] = useState([]);

  const [vendorName, setVendorName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {

    const storedVendors =
      JSON.parse(localStorage.getItem("vendors")) || [];

    setVendors(storedVendors);

  }, []);

  const addVendor = () => {

    if (!vendorName || !category) {
      alert("Fill all fields");
      return;
    }

    const newVendor = {
      id: Date.now(),
      vendorName,
      category
    };

    const updatedVendors = [
      ...vendors,
      newVendor
    ];

    setVendors(updatedVendors);

    localStorage.setItem(
      "vendors",
      JSON.stringify(updatedVendors)
    );

    setVendorName("");
    setCategory("");
  };

  const deleteVendor = (id) => {

    const updatedVendors =
      vendors.filter(
        vendor => vendor.id !== id
      );

    setVendors(updatedVendors);

    localStorage.setItem(
      "vendors",
      JSON.stringify(updatedVendors)
    );
  };

  return (

    <div className="container mt-4">

      <h2>Manage Vendors</h2>

      <div className="card p-4 mb-4">

        <input
          className="form-control mb-3"
          placeholder="Vendor Name"
          value={vendorName}
          onChange={(e)=>
            setVendorName(e.target.value)
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          value={category}
          onChange={(e)=>
            setCategory(e.target.value)
          }
        />

        <button
          className="btn btn-warning"
          onClick={addVendor}
        >
          Add Vendor
        </button>

      </div>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {vendors.map(vendor => (

            <tr key={vendor.id}>

              <td>{vendor.vendorName}</td>

              <td>{vendor.category}</td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteVendor(vendor.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageVendors;