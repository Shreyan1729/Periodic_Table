import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./../style/navbar.css";
import { logo } from "../assets/variants";
import { Elements } from "../assets/elements";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = ({ itemNameSelectedInNavbar, setItemNameSelectedInNavbar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = Elements.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number.toString().includes(searchTerm) ||
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.atomic_mass.toString().includes(searchTerm)
  );

  const handleItemClick = (
    itemName,
    itemNumber,
    itemSymbol,
    itemAtomicMass
  ) => {
    setItemNameSelectedInNavbar(
      itemName,
      itemNumber,
      itemSymbol,
      itemAtomicMass
    );
    setSearchTerm(itemName, itemSymbol, itemAtomicMass);
    console.log("Selected:", itemName, itemNumber, itemSymbol, itemAtomicMass);
    inputRef.current.focus();
  };

  return (
    <div className="navbar">
      <h1>
        <img
          src={logo}
          alt="logo"
          onClick={() => window.open("https://shreyandey.netlify.app/")}
          style={{ cursor: "pointer" }}
        />
        Periodic Table
      </h1>
      <div className="right">
        <div className="search-bar">
          <div className="container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="search"></div>

            {filteredData.length > 0 ? (
              <motion.ul
                className="search-results"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.3 } },
                }}
                initial="hidden"
                whileInView="show"
              >
                {filteredData.map((item) => (
                  <li
                    key={item.number}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      handleItemClick(
                        item.name,
                        item.number,
                        item.symbol,
                        item.atomic_mass
                      )
                    }
                  >
                    <p>{item.number}</p>
                    <p>{item.name}</p>
                    <p>{item.symbol}</p>
                    <p>{item.atomic_mass}</p>
                  </li>
                ))}
              </motion.ul>
            ) : (
              searchTerm && (
                <ul className="search-results">
                  <li>No match found</li>
                </ul>
              )
            )}
          </div>
        </div>

        <ul className="wrapper">
          <li
            className="icon facebook"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61554625316314"
              )
            }
          >
            <span className="tooltip">Facebook</span>
            <span>
              <FaFacebookF />
            </span>
          </li>
          <li
            className="icon instagram"
            onClick={() => window.open("https://wa.me/+8801818927655")}
          >
            <span className="tooltip">WhatsApp</span>
            <span>
              <FaWhatsapp />
            </span>
          </li>
          <li
            className="icon twitter"
            onClick={() => window.open("https://twitter.com/ShreyanDey")}
          >
            <span className="tooltip">Twitter</span>
            <span>
              <FaXTwitter />
            </span>
          </li>
          <li
            className="icon github"
            onClick={() => window.open("https://github.com/Shreyan1729")}
          >
            <span className="tooltip">Github</span>
            <span>
              <FaGithub />
            </span>
          </li>
          <li
            className="icon youtube"
            onClick={() =>
              window.open("http://mailto:shreyandeyrudra@gmail.com")
            }
          >
            <span className="tooltip">Discord</span>
            <span>
              <FaDiscord />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
