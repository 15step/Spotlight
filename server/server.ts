import * as express from "express";

export interface ProcessEnv {
    [key: string]: string | undefined;
}


const app: express.Application = express();
const port: number = 3000;


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});