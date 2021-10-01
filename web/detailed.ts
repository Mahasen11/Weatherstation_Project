import { Request, Response } from "express";
import { getDataFromUntil } from "./getData";
import { getTime } from "./getTime";

export const index = async (req: Request, res: Response) => {
	try {
		let from: string = getTime(0, 0, 1, 0);
		let until: string = getTime();
		let selected: string = "24h";

		if (req.method === "POST") {
			switch (req.body.range) {
				case "24h":
					from = getTime(0, 0, 1, 0);
					until = getTime();
					selected = "24h";
					break;

				case "1m":
					from = getTime(0, 1, 0, 0);
					until = getTime();
					selected = "1m";
					break;

				case "3m":
					from = getTime(0, 3, 0 , 0);
					until = getTime();
					selected = "3m";
					break;

				case "6m":
					from = getTime(0, 6, 0 , 0);
					until = getTime();
					selected = "6m";
					break;

				case "1y":
					from = getTime(1, 0, 0, 0);
					until = getTime();
					selected = "1y";
					break;

				case "custom":
					from =
						req.body.from.toString() +
						" " +
						req.body.fromHour.toString() +
						":00:00"; // req.body.from + req.body.fromHour
					until =
						req.body.until.toString() +
						" " +
						req.body.untilHour.toString() +
						":00:00"; // req.body.until + req.body.untilHour
					selected = "custom";
					break;

				default:
					res.render("detailed", {
						activeDetailed: true,
						data: [
							[
								"Well, I don't know how you managed to get this to display, but something has gone horribly wrong.",
							],
						],
					});
			}
		} else {
			from = getTime(0, 0, 1, 0);
			until = getTime();
			selected = "24h";
		}

		const result = await getDataFromUntil(from, until);

		let dataJson = JSON.parse(result);
		let Data: string[][] = [[]];

		for (let i = 0; i < dataJson.rowCount; i++) {
			Data[i] = [
				dataJson.rows[i].date,
				dataJson.rows[i].temperature,
				dataJson.rows[i].pressure,
				dataJson.rows[i].airquality,
				dataJson.rows[i].humidity,
			];
		}

		res.render("detailed", {
			activeDetailed: true,
			_24h: selected === "24h" ? true : false,
			_1m: selected === "1m" ? true : false,
			_3m: selected === "3m" ? true : false,
			_6m: selected === "6m" ? true : false,
			_1y: selected === "1y" ? true : false,
			custom: selected === "custom" ? true : false,
			data: Data,
		});
	} catch (error) {
		console.log(error);
		let selected: string = "24h";
		res.render("detailed", {
			activeDetailed: true,
			_24h: selected === "24h" ? true : false,
			_1m: selected === "1m" ? true : false,
			_3m: selected === "3m" ? true : false,
			_6m: selected === "6m" ? true : false,
			_1y: selected === "1y" ? true : false,
			custom: selected === "custom" ? true : false,
			data: [[(error as unknown as string).toString()]],
		});
	}
};
