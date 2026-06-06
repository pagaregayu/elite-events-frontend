import "./FeaturedCategories.css";

const categories = [
  "Wedding",
  "Corporate",
  "Conference",
  "Birthday",
  "Concert",
  "Product Launch"
];

function FeaturedCategories() {
  return (
    <section className="category-section">

      <div className="container">

        <h2 className="section-title">
          Event Categories
        </h2>

        <div className="row">

          {categories.map((item,index)=>(
            <div className="col-md-4 mb-4" key={index}>
              <div className="category-card">
                {item}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedCategories;