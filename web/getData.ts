import pg from "pg";


export async function getDataFromUntil(from: string, until: string): Promise<any> {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        //  connectionString: 'postgres://ugzsdvessgqvmv:259e909a7d52d3d92aafd58d95a10f543d9c55a5e9a2c77e7fa8195ae2168121@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dfervsnpldl5qi',
        ssl: {
            rejectUnauthorized: false
        }
    })

     client.connect();

    const query = 'SELECT * FROM weatherdata WHERE date BETWEEN $1 AND $2;';
    const values = [from, until];

    let data: string = '{';
    try{
    const response = await client.query(query, values);
         client.end();
        
        data += '"rowCount": ' + response.rowCount + ', ';
        data += '"rows": [';

        response.rows.forEach((value) => {
            value = JSON.stringify(value);

            // Cleans the timestamp from unnecessary junk
            value = value.replace('T', ' ');
            value = value.replace('Z', '');

            data += value + ', ';
        });

        // Removes last comma
        data += ']';
        data = data.replace('}, ]', '}]');
        data += '}';
        return data;
    }catch {
        
        console.log('error');
    }
}

export async function getDataRecent(): Promise<any> {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        // connectionString: 'postgres://ugzsdvessgqvmv:259e909a7d52d3d92aafd58d95a10f543d9c55a5e9a2c77e7fa8195ae2168121@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dfervsnpldl5qi',
        ssl: {
            rejectUnauthorized: false
        }
    })
    
    client.connect();
    
    const query = "SELECT * FROM weatherdata WHERE date = (SELECT MAX(date) FROM weatherdata);";
    
    let data: string = '{';
    data += '"row":';
    try{
    const response = await client.query(query);
        client.end();        
        
        let value = JSON.stringify(response.rows);
        
        // Cleans the timestamp from unnecessary junk
        value = value.replace('T', ' ');
        value = value.replace('Z', '');
        value = value.replace('[', '');
        value = value.replace(']', '');

        data += value;
        data += '}';
        
        return data;
    }catch(error){
        console.log(error);
    }
}

// Usage:
// getDataFromUntil("2021-09-06 11:55", "2021-09-09 12:58").then((result) => {
//     let results = JSON.parse(result);
//     results.rows.forEach((row: any) => {
//         console.log(row.date,
//                     row.temperature,
//                     row.humidity,
//                     row.pressure,
//                     row.airquality);
//     });
// }).catch((error) => {
//     console.log(error);
// })

// getDataSingle("2021-09-06 13:55").then((result) => {
//     let results = JSON.parse(result);

//     console.log(results.row.date,
//                 results.row.temperature,
//                 results.row.humidity,
//                 results.row.pressure,
//                 results.row.airquality);
// }).catch((error) => {
//     console.log(error);
// })
