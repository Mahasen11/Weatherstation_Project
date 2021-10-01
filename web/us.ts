import {Request,Response} from "express";

export const index=(req:Request,res:Response)=> {
      res.render("us", {
            activeAboutUs:true,
            title:"Us"
      })
}