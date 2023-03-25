import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsOptions } from './security/corsOptions';
import routes from './routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('combined'));

app.use("/", routes());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on  http://localhost:${PORT}`);
});
