"use strict";

//Grab and reference all HTML elements
const filterTypeSelect = document.querySelector("#filterTypeSelect");
const filterValueSelect = document.querySelector("#filterValueSelect");
const filterButton = document.querySelector("#filterButton");
const clearButton = document.querySelector("#clearButton");
const resultsDiv = document.querySelector("#results");

//Filter Button Event Listener ======================================================
filterTypeSelect.addEventListener("change", () =>{
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
  options.forEach((option) => {
    const option = document.createElement("option");
    option.value = option;
    option.textContent = option;
    filterValueSelect.appendChild(option);
  });

  //SIMPLIFIED
  // options.forEach(option => {
  //   const opt = new Option(option, option);
  //   filterValueSelect.appendChild(opt);
  // });

  //EVEN MORE SIMPLIFIED
  // filterValueSelect.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');      try to get this line to work
});
