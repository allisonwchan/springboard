// Problem 1
document.getElementById("container");

// Problem 2
document.querySelector("#container");

// Problem 3
document.querySelectorAll(".second");

// Problem 4
document.querySelector("ol .third");

// Problem 5
let txt = document.querySelector("#container");
txt.innerText = "Hello";

// Problem 6
let foot = document.querySelector(".footer");
foot.classList.add("main");

// Problem 7
foot.classList.remove("main");

// Problem 8
let newList = document.createElement("li");

// Problem 9
newList.innerText = "four";

// Problem 10
let ul = document.querySelector("ul");
ul.append(newList);

// Problem 11
let ordered_li = document.querySelectorAll("ol li");
for (let li of ordered_li) {
    li.style.backgroundColor = "green";
}

// Problem 12
foot.remove();