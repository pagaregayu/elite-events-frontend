import "./Services.css";

const services = [
  "Wedding Planning",
  "Corporate Events",
  "Birthday Events",
  "Conferences",
  "Product Launches",
  "Photography",
  "Decoration",
  "Catering"
];

function Services() {
  return (
    <section className="services-page">

      <div className="container">

        <h1 className="section-title">
          Our Services
        </h1>

        <div className="row">

          {services.map((service,index)=>(
            <div className="col-md-3 mb-4" key={index}>
              <div className="service-card">
                <h4>{service}</h4>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;