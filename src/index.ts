/**
Required External Modles
*/
import * as dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router } from "../src/items/items.routes";

dotenv.config();

/**
App variables
*/
if (!process.env.PORT) {
  process.exit(1);
}

const Port: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();

/**
App Configuration
*/
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/menu/items", router);
/**
Server Activication
*/

app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
