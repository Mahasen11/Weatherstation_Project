"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
var index = function (req, res) {
    res.render("project", {
        activeProject: true,
        title: "Project"
    });
};
exports.index = index;
