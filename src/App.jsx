import React, { useState, useEffect } from "react";
import "./App.css";
import { Elements } from "./assets/elements";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { motion } from "motion/react";
import { fadeIn } from "./assets/variants";

const ElementInfo = ({ element, getBackgroundColor }) => {
  return (
    <div
      className="element-info"
      style={{
        backgroundColor: getBackgroundColor(
          element.category,
          element["cpk-hex"]
        ),
        border: `7px solid ${getBackgroundColor(
          element.category,
          element["cpk-hex"]
        )}`,
      }}
    >
      <p className="element-number">{element.number}</p>
      <p className="element-symbol">{element.symbol}</p>
      <p className="element-name">{element.name}</p>
      <p className="element-mass">{element.atomic_mass}</p>
    </div>
  );
};

const WikipediaSection = ({ searchTerm, setLoading, setArticle }) => {
  useEffect(() => {
    const fetchWikipediaData = async () => {
      if (!searchTerm) {
        setArticle("Please enter a valid search term.");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            format: "json",
            origin: "*",
            prop: "extracts",
            exintro: true,
            explaintext: true,
            titles: searchTerm,
          },
        });

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        setArticle(pages[pageId].extract || "No article found.");
      } catch (error) {
        console.error("Error fetching data from Wikipedia:", error);
        setArticle("Failed to fetch article.");
      } finally {
        setLoading(false);
      }
    };

    fetchWikipediaData();
  }, [searchTerm, setArticle, setLoading]);
};

const ElementTable = ({ selectedElement, setSearchTerm, setWikiVisible }) => {
  if (!selectedElement) {
    return <p>Element data is not available</p>;
  }

  const tableData = [
    { label: "Discovered by", value: selectedElement.discovered_by },
    { label: "Named by", value: selectedElement.named_by },
    {
      label: "Electron Configuration",
      value: selectedElement.electron_configuration,
    },
    { label: "Appearance", value: selectedElement.appearance },
    { label: "Atomic Mass", value: selectedElement.atomic_mass },
    { label: "Boiling Point (K)", value: selectedElement.boil },
    { label: "Melting Point (K)", value: selectedElement.melt },
    { label: "Density (Kg/m³)", value: selectedElement.density },
    { label: "Molar Heat", value: selectedElement.molar_heat },
    {
      label: "Electron Affinity (KJ/mol)",
      value: selectedElement.electron_affinity,
    },
    {
      label: "Electronegativity (Pauling)",
      value: selectedElement.electronegativity_pauling,
    },
    {
      label: "Ionization Energies",
      value: selectedElement.ionization_energies?.join(", ") || "------",
    },
    {
      label: "Search in Wikipedia",
      value: (
        <span
          onClick={() => {
            setSearchTerm(selectedElement.name);
            setWikiVisible(true);
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {selectedElement.name}
        </span>
      ),
    },
  ];

  return (
    <table>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>
              <b>{item.label}</b>
            </td>
            <td>
              <span>{item.value || "------"}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [article, setArticle] = useState("");
  const [isIndex, setIsIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [wikiVisible, setWikiVisible] = useState(false);

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

  return (
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
                <span>
                  {selectedElement.boil || "-----"} K <FaChevronDown />
                </span>
              </p>
              <p>
                <b>Melting Point</b>
                <span>
                  {selectedElement.melt || "-----"} K <FaChevronDown />
                </span>
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
                <span>
                  20.271 K <FaChevronDown />
                </span>
              </p>
              <p>
                <b>Melting Point</b>
                <span>
                  13.99 K <FaChevronDown />
                </span>
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

        <div className="elements">
          {Elements.map((element, index) => (
            <div
              key={index}
              className="element"
              style={{
                backgroundColor: getBackgroundColor(
                  element.category,
                  element["cpk-hex"]
                ),
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
                <img
                  src={selectedElement.image?.url || ""}
                  alt={selectedElement.name}
                />

                <ElementTable
                  selectedElement={selectedElement}
                  setSearchTerm={setSearchTerm}
                  setWikiVisible={setWikiVisible}
                />
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
  );
};

export default App;
