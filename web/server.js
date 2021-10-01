"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorhandler_1 = __importDefault(require("errorhandler"));
var app_1 = __importDefault(require("./app"));
/**
 * Error handler that outputs full stacktraces is active when developing.
 */
if (app_1.default.get("env") == "development") {
    app_1.default.use((0, errorhandler_1.default)());
}
/**
 * Start Express server.
 */
var server = app_1.default.listen(app_1.default.get("port"), function () {
    console.log("  App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
