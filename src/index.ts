import express from 'express';
import cors from 'cors';
import {routes} from "./routes";
import './socket';

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5000']
}))

routes(app);

app.listen(8000, () => {
    console.log('listening to port 8000')
})
