"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataInput = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pg_1 = require("pg");
var dataDirectory = path_1.default.join(__dirname, '../web/data');
function dataInput(req, res) {
    console.log("dataInput called. Request body: " + req.body);
    fs_1.default.writeFileSync(path_1.default.resolve(dataDirectory, './data.json'), JSON.stringify(req.body));
    var client = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        // connectionString: 'postgres://ugzsdvessgqvmv:259e909a7d52d3d92aafd58d95a10f543d9c55a5e9a2c77e7fa8195ae2168121@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dfervsnpldl5qi',
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    var query = "INSERT INTO weatherdata VALUES(CURRENT_TIMESTAMP, $1,$2,$3,$4);";
    var values = [req.body.temperature, req.body.humidity, req.body.pressure, req.body.quality];
    // Querying the query
    client.query(query, values, function (error, response) {
        console.log(error, response);
        client.end();
    });
    client.query('DELETE FROM weatherdata WHERE temperature = 0 OR humidity = 0 OR airquality = 0;', function (error) {
        console.log(error);
    });
    res.sendStatus(200);
    res.end();
}
exports.dataInput = dataInput;
