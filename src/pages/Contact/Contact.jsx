import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram
} from "react-icons/fa";

import "./Contact.css";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: ""
  });

 const handleSubmit = (e) => {

  e.preventDefault();

  const messages =
    JSON.parse(
      localStorage.getItem(
        "messages"
      )
    ) || [];

  messages.push(form);

  localStorage.setItem(
    "messages",
    JSON.stringify(messages)
  );

  const notifications =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  notifications.unshift({

    id: Date.now(),

    message:
      `New message from ${form.name}`,

    date:
      new Date().toLocaleString(),

    read:false

  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );

  alert("Message Sent");

  setForm({
    name:"",
    email:"",
    message:""
  });

};

  return (
    <section className="contact-page">

      <div className="container">

        <h1 className="section-title">
          Contact Elite Events
        </h1>

        {/* Contact Cards */}

        <div className="row mb-5">

          <div className="col-md-3 mb-3">
            <div className="contact-card">
              <FaPhoneAlt size={35} />
              <h5>Call Us</h5>

              <a href="tel:+919356226842">
                +91 9356226842
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="contact-card">
              <FaEnvelope size={35} />
              <h5>Email</h5>

              <a href="mailto:pagaregayatri6@gmail.com">
                pagaregayatri6@gmail.com.com
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="contact-card">
              <FaWhatsapp size={35} />
              <h5>WhatsApp</h5>

              <a
                href="https://wa.me/919356226842"
                target="_blank"
                rel="noreferrer"
              >
                Chat Now
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="contact-card">
              <FaMapMarkerAlt size={35} />
              <h5>Visit Office</h5>

              <p>Karavenagar, Pune, Maharashtra, 411052</p>
            </div>
          </div>

        </div>

        {/* Form + Office Info */}

        <div className="row">

          <div className="col-lg-7">

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <h3>Send Message</h3>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                value={form.name}
                onChange={(e)=>
                  setForm({
                    ...form,
                    name:e.target.value
                  })
                }
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={form.email}
                onChange={(e)=>
                  setForm({
                    ...form,
                    email:e.target.value
                  })
                }
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e)=>
                  setForm({
                    ...form,
                    phone:e.target.value
                  })
                }
              />

              <select
                className="form-control mb-3"
                value={form.eventType}
                onChange={(e)=>
                  setForm({
                    ...form,
                    eventType:e.target.value
                  })
                }
              >
                <option>Select Event Type</option>
                <option>Wedding</option>
                <option>Corporate</option>
                <option>Conference</option>
                <option>Birthday</option>
              </select>

              <textarea
                rows="5"
                className="form-control mb-3"
                placeholder="Your Message"
                value={form.message}
                onChange={(e)=>
                  setForm({
                    ...form,
                    message:e.target.value
                  })
                }
              />

              <button className="btn btn-warning">
                Send Message
              </button>

            </form>

          </div>

          <div className="col-lg-5">

            <div className="office-info">

              <h3>Office Information</h3>

              <p>
                Elite Events Headquarters
              </p>

              <p>
                Pune, Maharashtra, India
              </p>

              <p>
                Mon - Sat : 9 AM - 7 PM
              </p>

              <div className="map-placeholder">
                <iframe
                  title="Karvenagar Location"
                  src="https://www.google.com/maps?q=Karvenagar,Pune,Maharashtra&output=embed"
                  width="100%"
                  height="300"
                  style={{
                    border: 0,
                    borderRadius: "15px"
                  }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div className="social-section">

                <h4>Follow Us</h4>

                <a
                  href="https://www.instagram.com/gayuu_p_2002"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} />
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;