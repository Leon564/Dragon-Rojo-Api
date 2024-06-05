import express from "express";
import cors from "cors";
import template from "./controllers/template.js";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", function (req, res) {
  res.send("home");
});

app.get("/new", template);

app.use("/api", routes);

export default app;
