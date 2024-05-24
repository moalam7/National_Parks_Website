"use strict";

window.onload = () => {
//Grab and reference all HTML elements
const filterTypeSelect = document.querySelector("#filterTypeSelect");
const filterValueSelect = document.querySelector("#filterValueSelect");
const filterButton = document.querySelector("#filterButton");
const clearButton = document.querySelector("#clearButton");
const resultsDiv = document.querySelector("#results");
const parkTable = document.querySelector("#parkTable");
const parkTableBody = document.querySelector("#parkTableBody");

//Filter Button Event Listener ======================================================
filterTypeSelect.addEventListener("change", () => {
  //variable to store the value in the select dropdown
  const selectedType = filterTypeSelect.value;

  //Using the above variable, if selectedType string is true, then style goes from display:none to inline-block
  //making it appear when option selected, else it stays "none"

  // if (selectedType) {
  //   filterValueSelect.style.display = "inline-block";
  // } else {
  //   filterValueSelect.style.display = "none";
  // }

  //Tertiary operator makes it so you can skip the if statements!
  filterValueSelect.style.display = selectedType ? "inline-block" : "none";
  filterButton.style.display = selectedType ? "inline-block" : "none";
  clearButton.style.display = selectedType ? "inline-block" : "none";
  parkTable.style.display = selectedType ? "inline-block" : "none";

  //Populate the filter value dropdown depending on which option selected, options will either be the locationsArray or parkTypeArray
  let options = [];
  if (selectedType === "State") {
    options = locationsArray;
  } else if (selectedType === "Type") {
    options = parkTypesArray;
  }
  // Try to condense that ^
  // let options = selectedType === "State" ? locationsArray : selectedType === "Type" ? parkTypesArray : [];

  //Dropdown to select either state(location) or type
  filterValueSelect.innerHTML = `<option value="">Select a value</option>`;
  //create option elements by looping through the arrayData lists
  //Setting the both the value and textContent of the option to the option of the list, so the State or parkType from data
  options.forEach(option => {
    const opt = new Option(option, option);
    filterValueSelect.appendChild(opt);
  });
});

// Event Listener Button for filter button CLICK ========================================================
filterButton.addEventListener("click", () => {
  const selectedType = filterTypeSelect.value;
  const selectedValue = filterValueSelect.value;

  resultsDiv.innerHTML = "";
  parkTableBody.innerHTML = ""; // Clear previous table rows

  if (!selectedValue) return;
  const filteredParks = nationalParksArray.filter((park) => {
    if (selectedType === "State") {
      return park.State === selectedValue;
    } else if (selectedType === "Type") {
      return selectedValue && park.LocationName.includes(selectedValue);
    }
    return false;
  });

  if (filteredParks.length > 0) {
    parkTable.style.display = "table";

    filteredParks.forEach((park) => {
      const row = document.createElement("tr");
      const cells = ["LocationName", "Address", "City", "State", "ZipCode", "Phone", "Visit"];
      cells.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = park[cell] || "N/A";
        if (cell === "Visit" && park[cell]) {
          const link = document.createElement("a");
          link.href = park[cell];
          link.textContent = "Visit";
          link.target = "_blank";
          td.textContent = "";
          td.appendChild(link);
        }
        row.appendChild(td);
      });
      parkTableBody.appendChild(row);
    });
  } else {
    resultsDiv.textContent = "No parks found.";
  }
});

// Event listener for clear filter button click
clearButton.addEventListener("click", () => {
  filterTypeSelect.value = "";
  filterValueSelect.innerHTML = '<option value="">Select a value</option>';
  filterValueSelect.style.display = "none";
  filterButton.style.display = "none";
  clearButton.style.display = "none";
  resultsDiv.innerHTML = "";
  parkTable.style.display = "none"; // Hide table on clear
  parkTableBody.innerHTML = ""; // Clear table body
});
};
