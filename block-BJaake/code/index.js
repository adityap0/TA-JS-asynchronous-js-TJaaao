let root = document.querySelector("ul");
let select = document.querySelector(`select`);
let fetch = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => {
      let data = JSON.parse(xhr.response);
      return resolve(data);
    };
    xhr.onerror = () => {
      return reject(`Something went wrong...`);
    };
    xhr.send();
  });
};
select.onchange = (event) => {
  root.innerHTML = "";
  let selected = event.target.value;
  let options = document.querySelectorAll("option");
  options.forEach((item) => {
    if (selected === item.outerText) {
      let data = fetch(
        "https://api.spaceflightnewsapi.net/v3/articles?_limit=30"
      )
        .then((data) => {
          data.forEach((item, id) => {
            if (item.newsSite === selected) {
              cre8News(item.imageUrl, item.newsSite, item.title);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log(`Done!!`);
        });
    }
  });
};

let cre8News = (url, site, title) => {
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("imagediv");
  let img = document.createElement("img");
  img.src = url;
  div.append(img);
  let div2 = document.createElement("div");
  div2.classList.add("news");
  let h2 = document.createElement("h2");
  h2.innerHTML = site;
  let p = document.createElement("p");
  p.innerText = title;
  let button = document.createElement("button");
  button.innerText = "Read More";
  div2.append(h2, p, button);
  li.append(div, div2);
  root.append(li);
};
