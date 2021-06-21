// //1
let x1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 1000);
});
let x2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 2000);
});
let x3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 3000);
});
let x4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Math.floor(Math.random() * 100));
  }, 4000);
});
Promise.all([x1, x2, x3, x4]).then((values) => {
  console.log(values);
});

//3
let fetch = (url, contestant) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => {
      return resolve(`${contestant}`);
    };
    xhr.onerror = () => {
      return new Error(`Something went wrong ...`);
    };
    xhr.send();
  });
};

let dogPromise = fetch(`https://random.dog/woof.json`, `Dog`);
let catPromise = fetch(`https://aws.random.cat/meow`, `Cat`);

Promise.race([dogPromise, catPromise]).then((values) => {
  console.log(`the winner is ${values}`);
});

//4

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Arya"), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Whoops!")), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve("John"), 3000)
);
Promise.allSettled([one, two, three]).then((data) => {
  console.log(data);
});
//all works when all the promises are settled
Promise.all([one, two, three]).then((data) => {
  console.log(`using all`, data);
});

//5
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Arya"), 1000);
  }),
  "Sam",
  { name: "John" },
]).then(console.log);
//(3) ["Arya", "Sam", {…}]
//time taken 1 second
