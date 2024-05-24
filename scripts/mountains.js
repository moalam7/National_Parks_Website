"use strict";

      document.addEventListener("DOMContentLoaded", () => {
        const mountainsList = document.querySelector("#mountainsList");
        const mountainName = document.querySelector("#mountainName");
        const mountainImg = document.querySelector("#mountainImg");
        const mountainDesc = document.querySelector("#mountainDesc");
        const mountainCoords = document.querySelector("#mountainCoords");
        const mountainSunrise = document.querySelector("#mountainSunrise");
        const mountainSunset = document.querySelector("#mountainSunset");
        const detailsButton = document.querySelector("#detailsButton");

        // function loadMountains() {
        //   for (const mountain of mountainsArray) {
        //     let option = document.createElement("option");
        //     option.textContent = mountain.name;
        //     option.value = mountain.name;
        //     mountainsList.appendChild(option);
        //   }
        // }

        function loadMountains() {
          mountainsArray.forEach((mountain) => {
            const option = document.createElement("option");
            option.textContent = mountain.name;
            option.value = mountain.name;
            mountainsList.appendChild(option);
          });
        }

        // function showMountainDetails() {
        //   const mountainNameValue = mountainsList.value;
        //   for (const mountain of mountainsArray) {
        //     if (mountain.name === mountainNameValue) {
        //       mountainName.textContent = mountain.name;
        //       mountainImg.src = `images/${mountain.img}`;
        //       mountainImg.alt = mountain.name;
        //       mountainImg.style.display = "block";
        //       mountainDesc.textContent = mountain.desc;
        //       mountainCoords.textContent = `Coordinates: Latitude ${mountain.coords.lat}, Longitude ${mountain.coords.lng}`;
        //     }
        //   }
        // }

        //API CALL FUNCTION
        async function getSunsetForMountain(lat, lng) {
          const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
          const data = await response.json();
          return data;
        }

        function showMountainDetails() {
          const selectedMountainName = mountainsList.value;
          const selectedMountain = mountainsArray.find((mountain) => mountain.name === selectedMountainName);

          if (selectedMountain) {
            mountainName.textContent = selectedMountain.name;
            mountainImg.src = `images/${selectedMountain.img}`;
            mountainImg.alt = selectedMountain.name;
            mountainImg.style.display = "block";
            mountainDesc.textContent = selectedMountain.desc;
            mountainCoords.textContent = `Coordinates: Latitude ${selectedMountain.coords.lat}, Longitude ${selectedMountain.coords.lng}`;
          }

          //API CALL FUNCTION to run when mountain is selected from dropdown and details will be shown
          //Makes it so it waits before fetching the data, only when button is pressed does the data get fetched
          getSunsetForMountain(selectedMountain.coords.lat, selectedMountain.coords.lng).then((data) => {
            if (data.status === "OK") {
              mountainSunrise.textContent = `Sunrise (UTC): ${data.results.sunrise}`;
              mountainSunset.textContent = `Sunset (UTC): ${data.results.sunset}`;
            } else {
              mountainSunrise.textContent = `Sunrise (UTC): Not available`;
              mountainSunset.textContent = `Sunset (UTC): Not available`;
            }
          });
        }

        // detailsButton.onclick = showMountainDetails;
        detailsButton.addEventListener("click", showMountainDetails);

        loadMountains();
      });

      // function init() {
      //   loadMountains();
      // }

      // window.onload = init;
