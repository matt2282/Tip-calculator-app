function buttonPress(id) {
  var currentid = localStorage.getItem("currentid");
  if (currentid && currentid !== "custom") {
    var currentElement = document.getElementById(currentid);
    currentElement.style.backgroundColor = "";
    currentElement.style.color = "";
  }
  var amount = document.getElementById(id);
  if (id !== "custom") {
    amount.style.backgroundColor = " hsl(172, 67%, 45%)";
    amount.style.color = "hsl(183, 100%, 15%)";
  }
  localStorage.setItem("currentid", id);
  checkReset();
}

const bill = document.getElementById("bill");
const custom = document.getElementById("percent");
const people = document.getElementById("people");
const tipAmount = document.querySelector("#tip-ammount h1 span");
const totalAmount = document.querySelector("#total-ammount h1 span");
const greyBoxPeople = document.getElementById("grey-box-people");
const error = document.getElementById("error");
const reset = document.querySelector(".reset");
document.addEventListener("DOMContentLoaded", checkReset());

people.addEventListener("invalid", (e) => {
  e.preventDefault();
  greyBoxPeople.style.boxShadow = "0 0 0 2px red";
  error.innerHTML = "Can't be zero";
});
function formSubmit(event) {
  event.preventDefault();
  checkReset();
  let peopleValue = parseFloat(people.value);
  let billValue = parseFloat(bill.value);
  let tipPercent = mapTipValue();

  if (isNaN(peopleValue) || isNaN(billValue) || peopleValue <= 0) {
    tipAmount.innerHTML = "0.00";
    totalAmount.innerHTML = "0.00";
    return;
  }

  let totalTip = billValue * (tipPercent / 100);
  let finalTip = (totalTip / peopleValue).toFixed(2);
  let billTotal = ((totalTip + billValue) / peopleValue).toFixed(2);

  tipAmount.innerHTML = finalTip;
  totalAmount.innerHTML = billTotal;
}
function resetError() {
  greyBoxPeople.style.boxShadow = "";
  error.innerHTML = "";
}
function mapTipValue() {
  resetError();
  const map = new Map();
  map.set("five", 5);
  map.set("ten", 10);
  map.set("fifteen", 15);
  map.set("twentyfive", 25);
  map.set("fifty", 50);
  var currentID = localStorage.getItem("currentid");
  var currentTip = map.get(currentID);
  if (currentTip == undefined) {
    const custom = document.getElementById("percent");
    currentTip = custom.value;
  }

  return currentTip;
}
function resetForm() {
  buttonPress("custom");
  bill.value = "";
  people.value = "";
  custom.value = "";
  tipAmount.innerHTML = "0.00";
  totalAmount.innerHTML = "0.00";
  localStorage.setItem("currentid", "");
  checkReset();
}
function checkReset() {
  var currentid = localStorage.getItem("currentid");
  if (
    bill.value == "" &&
    people.value == "" &&
    custom.value == "" &&
    (currentid === null || currentid === "")
  ) {
    reset.style.backgroundColor = "rgb(13,104,109)";
  } else {
    reset.style.backgroundColor = "";
  }
}
