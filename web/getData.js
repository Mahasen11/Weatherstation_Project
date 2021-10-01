"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRecent = exports.getDataFromUntil = void 0;
var pg_1 = __importDefault(require("pg"));
function getDataFromUntil(from, until) {
    return __awaiter(this, void 0, void 0, function () {
        var client, query, values, data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new pg_1.default.Client({
                        connectionString: process.env.DATABASE_URL,
                        //  connectionString: 'postgres://ugzsdvessgqvmv:259e909a7d52d3d92aafd58d95a10f543d9c55a5e9a2c77e7fa8195ae2168121@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dfervsnpldl5qi',
                        ssl: {
                            rejectUnauthorized: false
                        }
                    });
                    client.connect();
                    query = 'SELECT * FROM weatherdata WHERE date BETWEEN $1 AND $2;';
                    values = [from, until];
                    data = '{';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.query(query, values)];
                case 2:
                    response = _b.sent();
                    client.end();
                    data += '"rowCount": ' + response.rowCount + ', ';
                    data += '"rows": [';
                    response.rows.forEach(function (value) {
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
                    return [2 /*return*/, data];
                case 3:
                    _a = _b.sent();
                    console.log('error');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDataFromUntil = getDataFromUntil;
function getDataRecent() {
    return __awaiter(this, void 0, void 0, function () {
        var client, query, data, response, value, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new pg_1.default.Client({
                        connectionString: process.env.DATABASE_URL,
                        // connectionString: 'postgres://ugzsdvessgqvmv:259e909a7d52d3d92aafd58d95a10f543d9c55a5e9a2c77e7fa8195ae2168121@ec2-54-73-152-36.eu-west-1.compute.amazonaws.com:5432/dfervsnpldl5qi',
                        ssl: {
                            rejectUnauthorized: false
                        }
                    });
                    client.connect();
                    query = "SELECT * FROM weatherdata WHERE date = (SELECT MAX(date) FROM weatherdata);";
                    data = '{';
                    data += '"row":';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.query(query)];
                case 2:
                    response = _a.sent();
                    client.end();
                    value = JSON.stringify(response.rows);
                    // Cleans the timestamp from unnecessary junk
                    value = value.replace('T', ' ');
                    value = value.replace('Z', '');
                    value = value.replace('[', '');
                    value = value.replace(']', '');
                    data += value;
                    data += '}';
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getDataRecent = getDataRecent;
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
