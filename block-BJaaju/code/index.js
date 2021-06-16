let root = document.querySelector("ul");
let input = document.querySelector(`input`);
let xhr = new XMLHttpRequest();

input.onkeyup = (event) => {
  let search = event.target.value;
  if (event.keyCode === 13) {
    xhr.open(
      `GET`,
      `https://api.unsplash.com/search/photos?&query=${search}&client_id=tZmk05SGRoWrbFqdOcpLEK_rC2oeHq2DifSNLC4aCx8`
    );
    xhr.onload = () => {
      let data = JSON.parse(xhr.response);
      console.log(data.total);
      console.log(data);
      for (let i = 0; i < data.total; i++) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = data.results[i].urls.small;
        li.append(img);
        root.append(li);
      }
    };
    xhr.send();
    event.target.value = "";
  }
};

{
  /* <li>
  <img src="./photo-1481349518771-20055b2a7b24.jpg" alt="ban" />
</li>; */
}
