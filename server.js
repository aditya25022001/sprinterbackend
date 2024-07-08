import express from "express";
import { config } from "dotenv";
import connectDB from './config/db.js';
import userRoutes from './routes/user.js';
import projectRoutes from './routes/project.js';
import ticketRoutes from './routes/ticket.js';
import commentRoutes from './routes/comment.js';
import cors from 'cors';

config();

connectDB();

const PORT = process.env.PORT || 5000;

const ENV = process.env.ENV || 'dev';

const app = express();

app.use(express.json());

app.use(cors({
    methods:["GET","POST","PUT","DELETE"],
    allowed:["http://localhost:4200"]
}))

app.use('/api/v1/user',userRoutes);

app.use('/api/v1/project',projectRoutes);

app.use('/api/v1/ticket',ticketRoutes);

app.use('/api/v1/comment',commentRoutes);

app.get('/', (req,res) => {
    res.send("Hello world, this is the sprinter app backend")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${ENV} mode...`))