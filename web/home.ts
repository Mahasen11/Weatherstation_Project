import { Request, Response } from "express";
import { getDataRecent } from "./getData";
export const index = async (req: Request, res: Response) => {
	try {
		const response = await getDataRecent();
		const data = JSON.parse(response);
		const temp: number = data.row.temperature; //for testing purposes comment out
		const humi: number = data.row.humidity;
		const press: number = data.row.pressure;
		const airq: number = data.row.airquality;
		//these values are used for testing. Just delete the slashes below and you are ready to go with testing :)
		//const temp = 19;
		//const humi = 78;
		//const press = 1300;
		res.render("home", {

			//When both Temparature and Humidity is high, then the Rainbow appears.
			//When Temparature is high and Humidity is low,then the Sun appears.
			//When Temparature is low and Humdity is high, it rains.
			//When both Temparature and Humidity is low, its Cloudy.
			//The Theory behind matching the proportionality of the Weather Conditions with the GIFS :)//

			activeHome: true,
			isSunny: press >1030 ? true : false,
			isRaining: humi > 70 ? true : false,/*70 */
			isPolluted: airq > 70 ? true :false,
			temp,
			press,
			airq,
			humi,
		});
	} catch (error) {
		console.log(`${error}`);
	}
};

