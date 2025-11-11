import express from "express";
import db_connection from "./DB/connection.js";
import { config } from "dotenv";
import { global_response } from "./src/middlewares/error.handle.middleware.js";
import user_router from "./src/modules/user/user.route.js";

config();
const app = express();
const port = process.env.PORT;
db_connection();

app.use(express.json());
app.use("/user", user_router);
app.use(global_response);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
