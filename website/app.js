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

/**
 * onClick on the Submit button of the form performAction Function Will fire
 */
generateBtn.addEventListener("click", performAction);

/**
 * Define performAction Function Which Send data to The server and Request the Data from there
 * @param {object} e => the Event Object for Button Click
 */
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

/**
 * Function For posting the data into the POST route of the server
 *
 * @param {str} url => The url of the post route from the server.js File
 * @param {obj} data => The Data we need to pass when sending the POST request to the server
 * @returns {object} newData => The Object which contains the data from the API Calling
 */
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

/**
 * Function For retrieve the data from the GET route of the server
 *
 * @param {str} url => The url of the get route from the server.js File
 * @returns {object} newData => The Object which contains the data from the API Calling + The Data from the form in the index file
 */
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

/**
 * Function To Update the UI with the information coming from the GET route of the server
 *
 * @param {obj} projectData => The Data we need to Update The UI with
 * @returns {null}
 */
const updateUI = (projectData) => {
  const dateCont = document.getElementById("date");
  const tempCont = document.getElementById("temp");
  const contentCont = document.getElementById("content");
  dateCont.innerHTML = projectData.date;
  tempCont.innerHTML = Math.floor(projectData.data.main.temp) + " Celicus";
  contentCont.innerHTML = projectData.feelings;
};
