import React, { useState } from "react";
import { Elements } from "./assets/elements";
import { ImCross } from "react-icons/im";
import { motion } from "motion/react";
import { fadeIn } from "./assets/variants";
import ElementInfo from "./components/ElementInfo";
import WikipediaSection from "./components/WikipediaSection";
import ElementTable from "./components/ElementTable";
import { categories } from "./assets/categories";
import Navbar from "./components/Navbar";

import "./style/App.css";
import "./style/Responsive.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [article, setArticle] = useState("");
  const [isIndex, setIsIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [wikiVisible, setWikiVisible] = useState(false);
  const [color, setColor] = useState(false);
  const [addClass, setAddClass] = useState("");

  const selectedElement = isIndex !== null ? Elements[isIndex] : null;

  const getBackgroundColor = (category, cpkHex) => {
    if (cpkHex === null) return "#EEEEEE";
    const categoryColors = {
      "alkali metal": "#EACE5D",
      "alkaline earth metal": "#F1F165",
      lanthanide: "#E8D19C",
      actinide: "#F5CCDA",
      "transition metal": "#FAC5B7",
      metalloid: "#77C5B2",
      "post-transition metal": "#ACDFEC",
      "polyatomic nonmetal": "#8CED8C",
      "diatomic nonmetal": "#8CED8C",
      "noble gas": "#E5BDE5",
    };
    return categoryColors[category] || "#EEEEEE";
  };

  const handleMouseHover = (elementIndex) => {
    setIsIndex(elementIndex);
  };

  const handleMouseEnter = (category) => {
    setColor(true);
    setAddClass(category);
  };

  const handleMouseLeave = () => {
    setColor(false);
    setAddClass("");
  };

  const [itemNameSelectedInNavbar, setItemNameSelectedInNavbar] = useState({
    name: "",
    number: "",
    symbol: "",
    atomicMass: "",
  });

  const handleSetItemName = (name, number, symbol, atomicMass) => {
    setItemNameSelectedInNavbar({ name, number, symbol, atomicMass });
  };

  return (
    <>
      <Navbar
        itemNameSelectedInNavbar={itemNameSelectedInNavbar}
        setItemNameSelectedInNavbar={handleSetItemName}
      />

      <div className="App">
        <div className="main-all-elements">
          {selectedElement ? (
            <div className="more-about-elements">
              <ElementInfo
                element={selectedElement}
                getBackgroundColor={getBackgroundColor}
              />

              <main>
                <header>
                  <b>Series</b>
                  <span>{selectedElement.category}</span>
                </header>
                <p>
                  <b>Search in Wikipedia</b>
                  <span
                    onClick={() => {
                      setSearchTerm(selectedElement.name);
                      setWikiVisible(true);
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {selectedElement.name}
                  </span>
                </p>
                <p>
                  <b>Discovered by</b>
                  <span>{selectedElement.discovered_by || "-----"}</span>
                </p>
                <p>
                  <b>Named by</b>
                  <span>{selectedElement.named_by || "-----"}</span>
                </p>
                <p>
                  <b>Electron Configuration</b>
                  <span>{selectedElement.electron_configuration_semantic}</span>
                </p>
                <p>
                  <b>Appearance</b>
                  <span>{selectedElement.appearance || "-----"}</span>
                </p>
                <p>
                  <b>Boiling Point</b>
                  <span>{selectedElement.boil || "-----"} K</span>
                </p>
                <p>
                  <b>Melting Point</b>
                  <span>{selectedElement.melt || "-----"} K</span>
                </p>
                <p>
                  <b>Electron Affinity</b>
                  <span>
                    {selectedElement.electron_affinity || "-----"} KJ/mol
                  </span>
                </p>
                <p>
                  <b>Density</b>
                  <span>
                    {selectedElement.density || "-----"} Kg/m<sup>3</sup>
                  </span>
                </p>
                <p>
                  <b>Shells</b>
                  <span>
                    {selectedElement.shells?.map((shell, idx) => (
                      <span key={idx} className="shells">
                        {shell}
                      </span>
                    ))}
                  </span>
                </p>
                <p></p>
              </main>
            </div>
          ) : (
            <div className="more-about-elements">
              <ElementInfo
                element={Elements[0]}
                getBackgroundColor={getBackgroundColor}
              />
              <main>
                <header>
                  <b>Series</b>
                  <span>Diatomic Nonmetal</span>
                </header>
                <p>
                  <b>Search about</b>
                  <a
                    href={`https://en.wikipedia.org/wiki/Hydrogen`}
                    target="_blank"
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Hydrogen
                  </a>
                </p>
                <p>
                  <b>Discovered by</b>
                  <span>Henry Cavendish</span>
                </p>
                <p>
                  <b>Named by</b>
                  <span>Antoine Lavoisier</span>
                </p>
                <p>
                  <b>Electron Configuration</b>
                  <span>1s1</span>
                </p>
                <p>
                  <b>Appearance</b>
                  <span>Colorless Gas</span>
                </p>
                <p>
                  <b>Boiling Point</b>
                  <span>20.271 K</span>
                </p>
                <p>
                  <b>Melting Point</b>
                  <span>13.99 K</span>
                </p>
                <p>
                  <b>Electron Affinity</b>
                  <span>72.769 KJ/mol</span>
                </p>
                <p>
                  <b>Density</b>
                  <span>
                    Kg/m<sup>3</sup>
                  </span>
                </p>
                <p>
                  <b>Shells</b>
                  <span>1</span>
                </p>
              </main>
            </div>
          )}

          <section>
            <div className="names">
              {categories.map((category) => (
                <div
                  key={category.className}
                  className={category.className}
                  onMouseEnter={() => handleMouseEnter(category.className)}
                  onMouseLeave={handleMouseLeave}
                  style={{ backgroundColor: category.bgColor }}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </section>

          <div className={`elements ${addClass}`}>
            {Elements.map((element, index) => (
              <div
                key={index}
                className={`element ${element.category}`}
                style={{
                  backgroundColor: color
                    ? "transparent"
                    : getBackgroundColor(element.category, element["cpk-hex"]),
                  gridArea: `${element.ypos}/${element.xpos}`,
                }}
                onMouseEnter={() => handleMouseHover(index)}
                onClick={() => {
                  setSearchTerm(element.name);
                  setVisible(true);
                }}
              >
                <p className="number">{element.number}</p>
                <h3>{element.symbol}</h3>
                <p className="name">{element.name}</p>
                <p className="mass">{element.atomic_mass}</p>
              </div>
            ))}
          </div>
        </div>

        {wikiVisible && (
          <div className="Element" style={{ zIndex: 500 }}>
            <motion.section
              variants={fadeIn("up", 0)}
              initial="hidden"
              whileInView={"show"}
              style={{
                border: `7px solid ${getBackgroundColor(
                  selectedElement.category,
                  selectedElement["cpk-hex"]
                )}`,
              }}
              className="wikipedia-iframe-container"
            >
              <iframe
                title="Wikipedia Page"
                src={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                  searchTerm
                )}`}
                width="100%"
                height="600px"
                frameBorder="0"
                scrolling="yes"
              ></iframe>
            </motion.section>
            <ImCross className="cross" onClick={() => setWikiVisible(false)} />
          </div>
        )}

        {visible && selectedElement && (
          <div className="Element">
            <motion.section
              variants={fadeIn("up", 0)}
              initial="hidden"
              whileInView={"show"}
              style={{
                border: `7px solid ${getBackgroundColor(
                  selectedElement.category,
                  selectedElement["cpk-hex"]
                )}`,
              }}
            >
              <h1>{searchTerm}</h1>
              {loading ? (
                <p>Loading ...</p>
              ) : (
                <div className="text-div">
                  <p className="text">{article}</p>
                  <h2
                    style={{
                      color: `#${selectedElement["cpk-hex"]}`,
                      marginTop: "20px",
                    }}
                  >
                    <b>Properties of {selectedElement.name}</b>
                  </h2>
                  <div className="image">
                    <ElementTable
                      selectedElement={selectedElement}
                      setSearchTerm={setSearchTerm}
                      setWikiVisible={setWikiVisible}
                    />
                    <img
                      src={selectedElement.image?.url || ""}
                      alt={selectedElement.name}
                    />
                  </div>
                </div>
              )}
            </motion.section>
            <ImCross className="cross" onClick={() => setVisible(false)} />
          </div>
        )}

        <WikipediaSection
          searchTerm={searchTerm}
          setLoading={setLoading}
          setArticle={setArticle}
        />
      </div>
    </>
  );
};

export default App;
