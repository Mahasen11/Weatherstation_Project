const twoDigit = (num:number):string=>{
	let numStr = num.toString();
	if(num < 10){
		 numStr = num.toString();
		 numStr = "0" + numStr;
		
	}
	return numStr;
};
export function getTime(
	yearOffset: number = 0,
	monthOffset: number = 0,
	dayOffset: number = 0,
	hourOffset: number = 0
): string {

	const date: Date = new Date();
	const currYear = date.getUTCFullYear();
	const currMonth = date.getUTCMonth(); //Watch out!!! getMonth returns 0 for January, 1 for February and so on...
	const currDay = date.getUTCDate();
	const currHour = date.getUTCHours();
	const currMinute = date.getUTCMinutes();
	const currSecond = date.getUTCSeconds();

	

	// Correcting for overflow
	while (hourOffset > currHour) {
		hourOffset -= 24;
		dayOffset++;
	}

	while (dayOffset > (currDay+1)) {
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
	}}

	while (monthOffset > currMonth) {
		monthOffset -=  12;
		yearOffset++;
	}
	// /Correction end

	let dateString: string = "";
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
	dateString += `:${twoDigit(currMinute)}:${twoDigit(currSecond)}`;
	
	return dateString;
}

