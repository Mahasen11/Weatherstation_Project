"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
var get = function (req, res) {
    res.render("contact", {
        activeContact: true
    });
};
exports.get = get;
var post = function (req, res) {
    res.render("contactPost", {
        activeContact: true,
        firstName: req.body.fname
    });
};
exports.post = post;
