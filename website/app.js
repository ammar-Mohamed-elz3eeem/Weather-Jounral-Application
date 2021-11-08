/**
 * Define the Variables for the URL of The POST/GET requests
 */
const apiKey = "&appid=f50487e26bb3644b87e9fa884fea3f9e&units=metric";
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";

/**
 * Define the Variables for the DOM elements to Send the Request
 */
const zipCode = document.getElementById("zip");
const feelingTextarea = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", performAction);

function performAction(e) {
  e.preventDefault();
  const newZipCode = document.getElementById("zip").value;
  let date = new Date();
  let createdAt =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  getW(url + newZipCode + apiKey)
    .then((data) => {
      postW("/addRecord", {
        date: createdAt,
        ZipCode: newZipCode,
        feelings: feelingTextarea.value,
        data: data,
      });
    })
    .then(() => {
      getW("/all").then((data) => {
        console.log(data);
        updateUI(data);
      });
    })
    .catch((err) => {
      console.log("error: " + err);
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
const updateUI = (projectData) => {
  const dateCont = document.getElementById("date");
  const tempCont = document.getElementById("temp");
  const contentCont = document.getElementById("content");
  dateCont.innerHTML = projectData.date;
  tempCont.innerHTML = Math.floor(projectData.data.main.temp) + " Celicus";
  contentCont.innerHTML = projectData.feelings;
};
