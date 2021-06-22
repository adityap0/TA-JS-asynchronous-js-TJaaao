let root = document.querySelector("ul");
let loader = document.querySelector(".loader");
let charRoot = document.querySelector(".charlist");
let characters = document.querySelector(".characters");
let hero = document.querySelector(".hero");
characters.style.display = "none";
let close = document.querySelector(".close");
let allAlias = "";
let button = [];

let cr8book = (data) => {
  data.forEach((cv) => {
    let li = document.createElement("li");
    let h2 = document.createElement("h2");
    h2.innerText = cv.name;
    let cite = document.createElement("cite");
    cite.innerText = cv.authors[0];
    let btn = document.createElement("button");
    btn.innerText = `Show Characters (${cv.characters.length})`;
    li.append(h2, cite, btn);
    root.append(li);
  });
  button = document.querySelectorAll("button");
  button.forEach((btn, id) => {
    btn.onclick = (event) => {
      loader.style.display = "block";
      hero.style.display = "none";
      charRoot.innerHTML = "";
      data[id].characters.forEach((char) => {
        let charData = fetch(char).then((data) => {
          setTimeout(() => {
            characters.style.display = "block";
            loader.style.display = "none";
            data.aliases.forEach((alias) => {
              allAlias += alias + "";
            });
            let li = document.createElement("li");
            li.classList.add("charitem");
            li.innerText = `${data.name} (${allAlias})`;
            charRoot.append(li);
            allAlias = "";
          }, 2000);
        });
      });
      close.onclick = (event) => {
        characters.style.display = "none";
        hero.style.display = "block";
      };
    };
  });
};
let fetch = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    loader.style.display = "block";
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = () => {
      reject((error) => {
        throw new Error(error);
      });
    };
    xhr.send();
  });
};
let mainData = fetch(`https://www.anapioficeandfire.com/api/books`).then(
  (data) => {
    loader.style.display = "none";
    cr8book(data);
  }
);
