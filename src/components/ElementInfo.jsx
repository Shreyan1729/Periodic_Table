import React from "react";

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

export default ElementInfo;
