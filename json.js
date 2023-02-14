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
// const promise = fetch(DOG_URL);
// promise
// .then(function (response) {
// const processingPromise = response.json(); // instead of .innerText
// return processingPromise;
// })
// .then(function (processedResponse) {
// const dogObject = JSON.parse(processedResponse);
// the upper line is dismissed by the json that is placed higher
// const img = document.createElement("img");
// img.src = processedResponse.message; //the dogObject is also gone.
// img.alt = "Cute doggo";
// doggos.appendChild(img);
// });
// }

// document.getElementById("dog-btn").addEventListener("click", addNewDoggo);

// const DOG_URL_1 = "https://dog.ceo/api/breeds/image/random";
// const doggos2 = document.getElementById("dog-target-3");
// async function addAsyncDog() {
// const promiseNewDog = await fetch(DOG_URL_1);
// const processedResponseNew = await promiseNewDog.json();
// const newImg = document.createElement("newImg");
// newImg.src = processedResponseNew.message;
// newImg.alt = "the dog beast";
// doggos2.appendChild(newImg);
// }

// document.getElementById("button-dog").addEventListener(`click`, addAsyncDog);
const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.getElementById("dog-target");

async function addNewDoggo() {
  const promise = await fetch(DOG_URL);
  const processedResponse = await promise.json();
  const img = document.createElement("img");
  img.src = processedResponse.message;
  img.alt = "Cute doggo";
  doggos.appendChild(img);
}

document.getElementById("dog-btn").addEventListener("click", addNewDoggo);
