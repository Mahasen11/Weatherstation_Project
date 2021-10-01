"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
var twoDigit = function (num) {
    var numStr = num.toString();
    if (num < 10) {
        numStr = num.toString();
        numStr = "0" + numStr;
    }
    return numStr;
};
function getTime(yearOffset, monthOffset, dayOffset, hourOffset) {
    if (yearOffset === void 0) { yearOffset = 0; }
    if (monthOffset === void 0) { monthOffset = 0; }
    if (dayOffset === void 0) { dayOffset = 0; }
    if (hourOffset === void 0) { hourOffset = 0; }
    var date = new Date();
    var currYear = date.getUTCFullYear();
    var currMonth = date.getUTCMonth(); //Watch out!!! getMonth returns 0 for January, 1 for February and so on...
    var currDay = date.getUTCDate();
    var currHour = date.getUTCHours();
    var currMinute = date.getUTCMinutes();
    var currSecond = date.getUTCSeconds();
    // Correcting for overflow
    while (hourOffset > currHour) {
        hourOffset -= 24;
        dayOffset++;
    }
    while (dayOffset > (currDay + 1)) {
        switch (currMonth) { //Using currMonth i.o. (currMonth+1) because by going back in time the month BEFORE matters not the actual current Month.
            case 2:
                dayOffset -= 28;
                monthOffset++;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                dayOffset -= 30;
                monthOffset++;
                break;
            default:
                dayOffset -= 31;
                monthOffset++;
                break;
        }
    }
    while (monthOffset > currMonth) {
        monthOffset -= 12;
        yearOffset++;
    }
    // /Correction end
    var dateString = "";
    // Applying year offset
    dateString += (currYear - yearOffset).toString();
    dateString += "-";
    // Applying month offset
    dateString += twoDigit((currMonth + 1 - monthOffset)).toString();
    dateString += "-";
    // Applying day offset !(Careful - getDay returns the day of the week as an integer, not the day of the month)!
    dateString += twoDigit((currDay - dayOffset));
    dateString += " ";
    // Applying hour offset
    dateString += twoDigit((currHour - hourOffset));
    //Completing the date string
    dateString += ":" + twoDigit(currMinute) + ":" + twoDigit(currSecond);
    return dateString;
}
exports.getTime = getTime;
