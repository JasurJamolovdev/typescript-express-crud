import express, {Application} from "express";
import dotenv from "dotenv";
import path from "path";
const app: Application = express();
import animalsRouter from "./routers/animals.router";

// config .env
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));


//using routers
app.use(animalsRouter);


const PORT: string | number = process.env.PORT || 3005;
app.listen(PORT, (): void => {
   console.log(`Server running on port ${PORT}`);  
});