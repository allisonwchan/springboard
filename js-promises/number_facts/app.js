const baseURL = "http://numbersapi.com";
const favNumber = 2;

// part 1
async function part1() {
    let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(data);
}
part1();

// part 2
let favNumbers = [1,2,3];
async function part2() {
    let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
    console.log(data);
}
part2();

// part 3
async function part3() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }
  part3();