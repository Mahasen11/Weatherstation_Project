"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var home = __importStar(require("./home"));
var detailed = __importStar(require("./detailed"));
var contact = __importStar(require("./contact"));
var dotenv_1 = __importDefault(require("dotenv"));
var project = __importStar(require("./project"));
var us = __importStar(require("./us"));
var dataInput = __importStar(require("./dataInput"));
dotenv_1.default.config();
// Create Express server
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "../web/views"));
app.engine('handlebars', (0, express_handlebars_1.default)());
app.set("view engine", "handlebars");
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
/**
 * Primary app routes.
 */
app.get("/", home.index);
app.get("/detailed", detailed.index);
app.get("/project", project.index);
app.get("/contact", contact.get);
app.post("/contactPOST", contact.post);
app.post("/detailed", detailed.index);
app.get("/us", us.index);
app.post("/dataInput", dataInput.dataInput);
exports.default = app; //for import without {} in other files
