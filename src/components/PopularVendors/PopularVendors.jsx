import "./PopularVendors.css";

const vendors = [
{
id:1,
name:"Royal Weddings",
rating:"4.9"
},
{
id:2,
name:"Elite Caterers",
rating:"4.8"
},
{
id:3,
name:"Dream Decor",
rating:"5.0"
}
];

function PopularVendors() {
  return (
    <section className="vendor-section">

      <div className="container">

        <h2 className="section-title">
          Popular Vendors
        </h2>

        <div className="row">

          {vendors.map((vendor)=>(
            <div
             className="col-md-4"
             key={vendor.id}
            >

              <div className="vendor-card">

                <img
                src="https://images.unsplash.com/photo-1519167758481-83f29c8b9f53"
                alt=""
                />

                <h4>{vendor.name}</h4>

                <p>
                  ⭐ {vendor.rating}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default PopularVendors;