import express from "express";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 5000;

const ENV = process.env.ENV || 'dev';

const app = express();

app.get('/', (req,res) => {
    res.send("Hello world, this is the sprinter app backend")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${ENV} mode...`))