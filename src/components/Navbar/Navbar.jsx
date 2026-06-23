import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");

  const isAdmin =
    localStorage.getItem("adminToken") === "true";

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav
      className="
      fixed
      top-0
      left-1/2
      -translate-x-1/2
      w-[96%]
      max-w-[1500px]
      z-50
      bg-white/95
      backdrop-blur-md
      rounded-2xl
      shadow-xl
      border
      border-gray-100
      "
    >
      <div className="px-8 lg:px-12">

        <div
          className="
          flex
          justify-between
          items-center
          h-20
          "
        >

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center"
          >
            <h1
              className="
              text-2xl
              lg:text-4xl
              font-black
              tracking-[8px]
              "
            >
              <span
                className="
                bg-gradient-to-r
                from-yellow-400
                via-yellow-500
                to-amber-700
                bg-clip-text
                text-transparent
                "
              >
                ELITE
              </span>

              <span className="ml-5 text-black">
                EVENTS
              </span>
            </h1>
          </Link>

          {/* DESKTOP MENU */}

          <div
            className="
            hidden
            lg:flex
            items-center
            ml-24
            xl:ml-40
            gap-8
            xl:gap-10
            "
          >

            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Services", "/services"],
              ["Gallery", "/gallery"],
              ["Happy Clients", "/happy-clients"],
              ["Reviews", "/add-review"],
              ["Contact", "/contact"],
            ].map(([name, path]) => (
              <Link
                key={name}
                to={path}
                className="
                relative
                text-black
                font-medium
                group
                "
              >
                {name}

                <span
                  className="
                  absolute
                  left-0
                  -bottom-1
                  h-[2px]
                  w-0
                  bg-yellow-500
                  transition-all
                  duration-300
                  group-hover:w-full
                  "
                ></span>
              </Link>
            ))}

            {/* PORTFOLIO */}

            <a
              href="/portfolio/Resume_Gayatri_Pagare_9356226842.pdf"
              target="_blank"
              rel="noreferrer"
              className="
              relative
              text-black
              font-medium
              group
              "
            >
              Portfolio

              <span
                className="
                absolute
                left-0
                -bottom-1
                h-[2px]
                w-0
                bg-yellow-500
                transition-all
                duration-300
                group-hover:w-full
                "
              ></span>
            </a>

            {/* ADMIN DASHBOARD */}

            {isAdmin && (
              <Link
                to="/admin"
                className="
                px-4
                py-2
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-pink-500
                text-white
                font-semibold
                text-sm
                shadow-md
                hover:scale-105
                transition
                "
              >
                Dashboard
              </Link>
            )}

            {/* ADMIN LOGIN */}

            

            {/* LOGOUT */}

          
            

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
            lg:hidden
            text-2xl
            text-black
            "
          >
            {menuOpen
              ? <FaTimes />
              : <FaBars />}
          </button>

        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div
            className="
            lg:hidden
            bg-white
            border-t
            border-gray-100
            py-5
            flex
            flex-col
            gap-4
            "
          >

            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/happy-clients">
              Happy Clients
            </Link>
            <Link to="/add-review">
              Reviews
            </Link>

            <a
              href="/portfolio/Resume_Gayatri_Pagare_9356226842.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>

            <Link to="/contact">
              Contact
            </Link>

            {!isAdmin && (
              <Link
                to="/admin-login"
                className="
                bg-yellow-500
                text-white
                text-center
                py-3
                rounded-lg
                "
              >
                Admin Login
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="
                bg-purple-600
                text-white
                text-center
                py-3
                rounded-lg
                "
              >
                Dashboard
              </Link>
            )}

            

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;