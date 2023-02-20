import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "../mongodb/connect.js";
import postRoutes from "../routes/postRoutes.js";
import dalleRoutes from "../routes/dalleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('<h1>Welcome to Dall-e</h1>');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(process.env.PORT || 5000, () => console.log('App Listening on port 8080'))
    }catch(err){
        console.log(err)
    }
}

startServer();