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
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
var getData_1 = require("./getData");
var getTime_1 = require("./getTime");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var from_1, until_1, selected, result, dataJson, Data, i, error_1, selected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                from_1 = (0, getTime_1.getTime)(0, 0, 1, 0);
                until_1 = (0, getTime_1.getTime)();
                selected = "24h";
                if (req.method === "POST") {
                    switch (req.body.range) {
                        case "24h":
                            from_1 = (0, getTime_1.getTime)(0, 0, 1, 0);
                            until_1 = (0, getTime_1.getTime)();
                            selected = "24h";
                            break;
                        case "1m":
                            from_1 = (0, getTime_1.getTime)(0, 1, 0, 0);
                            until_1 = (0, getTime_1.getTime)();
                            selected = "1m";
                            break;
                        case "3m":
                            from_1 = (0, getTime_1.getTime)(0, 3, 0, 0);
                            until_1 = (0, getTime_1.getTime)();
                            selected = "3m";
                            break;
                        case "6m":
                            from_1 = (0, getTime_1.getTime)(0, 6, 0, 0);
                            until_1 = (0, getTime_1.getTime)();
                            selected = "6m";
                            break;
                        case "1y":
                            from_1 = (0, getTime_1.getTime)(1, 0, 0, 0);
                            until_1 = (0, getTime_1.getTime)();
                            selected = "1y";
                            break;
                        case "custom":
                            from_1 =
                                req.body.from.toString() +
                                    " " +
                                    req.body.fromHour.toString() +
                                    ":00:00"; // req.body.from + req.body.fromHour
                            until_1 =
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
                }
                else {
                    from_1 = (0, getTime_1.getTime)(0, 0, 1, 0);
                    until_1 = (0, getTime_1.getTime)();
                    selected = "24h";
                }
                return [4 /*yield*/, (0, getData_1.getDataFromUntil)(from_1, until_1)];
            case 1:
                result = _a.sent();
                dataJson = JSON.parse(result);
                Data = [[]];
                for (i = 0; i < dataJson.rowCount; i++) {
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
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                selected = "24h";
                res.render("detailed", {
                    activeDetailed: true,
                    _24h: selected === "24h" ? true : false,
                    _1m: selected === "1m" ? true : false,
                    _3m: selected === "3m" ? true : false,
                    _6m: selected === "6m" ? true : false,
                    _1y: selected === "1y" ? true : false,
                    custom: selected === "custom" ? true : false,
                    data: [[error_1.toString()]],
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
