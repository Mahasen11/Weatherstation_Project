import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Client } from "pg";

let dataDirectory = path.join(__dirname, '../web/data');
export function dataInput(req: Request, res: Response) {
    console.log(`dataInput called. Request body: ${req.body}`);

    fs.writeFileSync(path.resolve(dataDirectory, './data.json'), JSON.stringify(req.body));

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        // connectionString: 'postgres://ugzsdvessgqvmv:259e909a7d52d3d92aafd58d95a10f543d9c55a5e9a2c77e7fa8195ae2168121@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dfervsnpldl5qi',
        ssl: {
            rejectUnauthorized: false
        }
    })

    client.connect();

    const query = "INSERT INTO weatherdata VALUES(CURRENT_TIMESTAMP, $1,$2,$3,$4);";
    const values = [req.body.temperature, req.body.humidity, req.body.pressure, req.body.quality];

    // Querying the query
    client.query(query, values, (error, response) => {
        console.log(error, response);
        client.end();
    })

    client.query('DELETE FROM weatherdata WHERE temperature = 0 OR humidity = 0 OR airquality = 0;',(error)=>{
        console.log(error);
    })

    res.sendStatus(200);
    res.end();
}