import express from 'express';
import cors from 'cors';
import {routes} from "./routes";
import './socket';
import {DataSource} from "typeorm";

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "rootroot",
    database: "node_websockets",
    entities: [],
    logging: false,
    synchronize: true
});

dataSource.initialize().then(connection => {
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5000']
    }))

    routes(app);

    app.listen(8000, () => {
        console.log('listening to port 8000')
    })
})


