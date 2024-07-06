// ****** Global Variables ******
const inputLocation = document.getElementById("input-location");
const currentLocation = document.getElementById("current-location");
const currentTemp = document.getElementById("current-temp");
const currentFeelsLike = document.getElementById("current-feels-like");
const currentWind = document.getElementById("current-wind");
const currentHumidity = document.getElementById("current-humidity");
const forecast = document.getElementById("forecast");

// ****** Model ******
const key = "85fef82af8b645699ff114130242801";
let data;

async function getData(locationName) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=${key}&q=${locationName}&aqi=no`,
			{ mode: "cors" }
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.error("An error has occurred:", error);
	}
}

async function updateData(location) {
	try {
		const dataUpdate = await getData(location);
		if (dataUpdate) {
			updateDOM(dataUpdate);
		}
	} catch (error) {
		console.error(`Error updating data: ${error}`);
	}
}

// ****** View ******

function getInputData() {
	const inputData =
		document.getElementById("input-location").value || "Hell, MI";
	return inputData;
}

function updateDOM(data) {
	inputLocation.value = "";

	// Empty values until API is set up
	if (data) {
		forecast.innerHTML = data.current.condition.text;
		currentLocation.innerHTML = data.location.name;

		currentTemp.innerHTML = `${data.current.temp_f}&deg F`;
		currentFeelsLike.innerHTML = `Feels Like: ${data.current.feelslike_f}&deg F`;
		currentWind.innerHTML = `Wind: ${data.current.wind_mph} mph`;
		currentHumidity.innerHTML = `Humidity: ${data.current.humidity}%`;
	} else {
		console.error("Data is undefined");
	}
}

// ****** Controller ******
const inputButton = document.getElementById("input-button");
inputButton.addEventListener("click", () => {
	let inputData = getInputData();
	data = getData(inputData);
	updateData(inputData);
});

inputLocation.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		let inputData = getInputData();
		data = getData(inputData);
		updateData(inputData);
	}
});
