/**
 * Define the Variables for the URL of The POST/GET requests
 */
let apiKey = "&appid=f50487e26bb3644b87e9fa884fea3f9e";
let url = "https://api.openweathermap.org/data/2.5/weather?zip=";

/**
 * Define the Variables for the DOM elements to Send the Request
 */
let zipCode = document.getElementById("zip");
let feelingTextarea = document.getElementById("feelings");
let generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", performAction);

function performAction(e) {
  e.preventDefault();
  const newZipCode = document.getElementById("zip").value;
  let date = new Date();
  let createdAt =
    date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();

  console.log(newZipCode);
  getW(url + newZipCode + apiKey).then((data) => {
    updateUI(createdAt, data);
  });
  postW("/addRecord", {
    ZipCode: zipCode.value,
    feelings: feelingTextarea.value,
  });
}

const postW = async function (url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  try {
    let newData = await res.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log("Error: " + err);
  }
};

const getW = async function (url) {
  const res = await fetch(url);
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (e) {
    console.log("error: " + e);
  }
};
const updateUI = (date, data) => {
  const dateCont = document.getElementById("date");
  const tempCont = document.getElementById("temp");
  const contentCont = document.getElementById("content");
  dateCont.innerHTML = date;
  tempCont.innerHTML = Math.floor(data.main.temp - 273) + " Celicus";
  contentCont.innerHTML = data.weather[0].description;
};
