import express from "express";
import path from "path";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import * as home from "./home";
import * as detailed from "./detailed";
import * as contact from "./contact";
import dotenv from "dotenv";
import * as project from "./project";
import * as us from "./us";
import * as dataInput from "./dataInput";

dotenv.config();

// Create Express server
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../web/views"));
app.engine('handlebars', exphbs());
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));


/**
 * Primary app routes.
 */
app.get("/", home.index);
app.get("/detailed", detailed.index);
app.get("/project", project.index);
app.get("/contact", contact.get);
app.post("/contactPOST", contact.post);
app.post("/detailed", detailed.index);
app.get("/us",us.index);
app.post("/dataInput", dataInput.dataInput);

export default app; //for import without {} in other files