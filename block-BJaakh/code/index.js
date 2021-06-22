// *GET, POST, PUT, DELETE, etc.
let close = [];
let rootUl = document.querySelector("ul");
let cre8list = (data) => {
  data.todos.forEach((cv, id) => {
    let li = document.createElement("li");
    li.classList.add("work");
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.type = "checkbox";
    let p = document.createElement("p");
    p.innerText = cv.title;
    div.append(input, p);
    let div2 = document.createElement("div2");
    div2.innerText = "❌";
    div2.classList.add("close");
    div2.setAttribute("id", id);
    li.append(div, div2);
    rootUl.append(li);
  });
};

//Add new 2-DO

//GET 2DO LIST
fetch(`https://sleepy-falls-37563.herokuapp.com/api/todo`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    cre8list(data);
    close = document.querySelectorAll(".close");
    console.log(close);
  });

//DELETE
let delete2Do = (close, data) => {
  close.forEach((cross) => {
    cross.onclick = (e) => {
      console.log(e);
      fetch(
        `https://sleepy-falls-37563.herokuapp.com/api/todo/${
          data.todos[e.target.id]._id
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          Promise.resolve(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          cre8list(data);
        });
    };
  });
};

let input = document.querySelector("input");
input.onkeyup = (e) => {
  if (e.key === "Enter") {
    rootUl.innerHTML = "";
    let data = {
      todo: {
        title: `${e.target.value}`,
        isCompleted: false,
      },
    };
    fetch(`https://sleepy-falls-37563.herokuapp.com/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cre8list(data);
      });
    e.target.value = "";
  }
};
