let root = document.querySelector("ul");
let input = document.querySelector(`input`);

let createImage = (data) => {
  for (let i = 0; i < data.total; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = data.results[i].urls.small;
    li.append(img);
    root.append(li);
  }
};
input.onkeyup = (event) => {
  let search = event.target.value;
  if (event.keyCode === 13) {
    root.innerHTML = "";
    let url = `https://api.unsplash.com/search/photos?&query=${search}&client_id=tZmk05SGRoWrbFqdOcpLEK_rC2oeHq2DifSNLC4aCx8`;
    let data = fetch(url)
      .then((data) => createImage(data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log(`done`));
    event.target.value = "";
  }
};
let fetch = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => {
      let data = JSON.parse(xhr.response);
      return resolve(data);
    };
    xhr.onerror = () => {
      return reject(`Something went wrong ...`);
    };
    xhr.send();
  });
};
