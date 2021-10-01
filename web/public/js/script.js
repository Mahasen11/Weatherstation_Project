"use strict";
var from = document.querySelector('#from');
var until = document.querySelector('#until');
var fromHour = document.querySelector('#fromHour');
var untilHour = document.querySelector('#untilHour');
var radio = document.querySelector('input[type="radio"]');
var custom = document.querySelector('input[value="custom"]');
var date = new Date();
// Date
var today = date.getFullYear() + "-";
if (date.getMonth() < 10) {
    today += "0";
    today += (date.getMonth() + 1);
}
else {
    today += (date.getMonth() + 1);
}
today += "-";
if (date.getDate() < 10) {
    today += "0";
    today += date.getDate();
}
else {
    today += date.getDate();
}
from.max = today;
until.max = today;
until.value = today;
from.value = today;
// Event listeners
from.addEventListener('focus', function (event) {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;
});
fromHour.addEventListener('focus', function (event) {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;
});
until.addEventListener('focus', function (event) {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;
});
untilHour.addEventListener('focus', function (event) {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;
});
