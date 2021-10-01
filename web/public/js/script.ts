let from = document.querySelector('#from') as HTMLInputElement;
let until = document.querySelector('#until') as HTMLInputElement;
let fromHour = document.querySelector('#fromHour') as HTMLInputElement;
let untilHour = document.querySelector('#untilHour') as HTMLInputElement;
let radio = document.querySelector('input[type="radio"]') as HTMLInputElement;
let custom = document.querySelector('input[value="custom"]') as HTMLInputElement;

const date = new Date();

// Date
let today = date.getFullYear() + "-";

if (date.getMonth() < 10) {
    today += "0";
    today += (date.getMonth() + 1);
} else {
    today += (date.getMonth() + 1);
}

today += "-";

if (date.getDate() < 10) {
    today += "0";
    today += date.getDate();
} else {
    today += date.getDate();
}

from.max = today;
until.max = today;

until.value = today;
from.value = today;

// Event listeners
from.addEventListener('focus', (event: Event) => {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;    
})

fromHour.addEventListener('focus', (event: Event) => {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;    
})

until.addEventListener('focus', (event: Event) => {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;    
})

untilHour.addEventListener('focus', (event: Event) => {
    event.preventDefault();
    radio.checked = false;
    custom.checked = true;    
})
