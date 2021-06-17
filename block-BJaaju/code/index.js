function fetchData(url) {
  let xhr = new XMLHttpRequest();
  xhr.open(`GET`, url);
  xhr.onload = () => {
    let data = JSON.parse(xhr.response);
    console.log(data);
  };
  xhr.send();
}
fetchData(`xyz`);
function fetch() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => {
      return resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = () => {
      return reject(`Something went wrong...`);
    };
    xhr.send();
  });
}

let data = fetch(`xyz`)
  .then((data) => {
    console.log(data.name);
  })
  .catch((error) => {
    console.log(error);
  });
