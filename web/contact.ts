import { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
    res.render("contact", {
        activeContact: true
    })
}

export const post = (req: Request, res: Response) => {
    res.render("contactPost", {
        activeContact: true,
        firstName: req.body.fname
    })
}