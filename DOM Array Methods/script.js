const main = document.getElementById("main");
const add_userBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const show_millionariesBtn = document.getElementById("show-millionaires");
const calculate_wealthBtn = document.getElementById("calculate-wealth");
const sortby_Richest = document.getElementById("sortby-richest");

let data = [];

//fetch random user
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const new_User = {
    name: data.results[0].name.first,
    money: Math.floor(Math.random() * 2000000),
  };
  addData(new_User);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

function sortbyRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function millionaries() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

function calculatewealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement(`div`);
  wealthEl.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<stronge>${item.name}</stronge>
    ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

add_userBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortby_Richest.addEventListener("click", sortbyRichest);
show_millionariesBtn.addEventListener("click", millionaries);
calculate_wealthBtn.addEventListener("click", calculatewealth);
