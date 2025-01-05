import React from "react";

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

export default ElementTable;
