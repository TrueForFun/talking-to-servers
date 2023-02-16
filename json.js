const responseFromServer = `{"name": "Luna", "age": 18, "breed" :"Havanese",
"location": {"city": "Seatle", "state": "WA"}}`;

console.log(responseFromServer);

const responseObject = JSON.parse(responseFromServer);

console.log(responseObject);
console.log(responseObject.location.city);

const dog = {
  name: "Luna",
  age: 10,
  breed: "Havanese",
  location: {
    city: "Seatle",
    state: "WA",
  },
};
const objString = JSON.stringify(dog);
console.log(objString);

// const DOG_URL = "https://dog.ceo/api/breeds/image/random";

// const doggos = document.getElementById("dog-target");

// function addNewDoggo() {
//   const promise = fetch(DOG_URL);
//   promise
//     .then(function (response) {
//       const processingPromise = response.json(); // instead of .innerText
//       return processingPromise;
//     })
//     .then(function (processedResponse) {
//       const dogObject = JSON.parse(processedResponse);
//       // the upper line is dismissed by the json that is placed higher
//       const img = document.createElement("img");
//       img.src = processedResponse.message; //the dogObject is also gone.
//       img.alt = "Cute doggo";
//       doggos.appendChild(img);
//     });
// }

// document.getElementById("dog-btn").addEventListener("click", addNewDoggo);
const DOG_URL = "https://dog.ceo/api/breeds/image/random";

document
  .getElementById("dog-image-button")
  .addEventListener("click", addAsyncDog);

async function addAsyncDog() {
  const response = await fetch(DOG_URL);
  const processedResponse = await response.json();
  const imgElement = document.createElement("img");
  imgElement.src = processedResponse.message;
  imgElement.alt = "the dog beast";
  imgElement.style.width = "100%";

  document.getElementById("dog-image-container").appendChild(imgElement);
}
