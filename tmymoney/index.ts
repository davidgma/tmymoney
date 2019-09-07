import { Logger } from './logger';
import { FileUtils } from './file-utils';
import { readFile } from 'fs';
import { homedir } from 'os';
import { createServer } from 'http';
//import {  } from 'express';
import express from "express";

const logDir = homedir + "/.local/tmymoney";
const logName = "tmymoney.log";

async function main() {
    let logger = new Logger(logDir, logName);
    console.log("homedir: " + homedir);
    console.log("Converting the KMyMoney file...");
    let command = "./convert-xml";
    let args = new Array<string>();
    // args.push("../../../kmymoney/KMyMoney_David.xml");
    FileUtils.execute(command, args).then((res) => {
        for (let line of res)
            console.log(line);
        readFile("/dev/shm/tmymoney/test.json", 'utf8', (err, data) => {
            //let jo = data.toJSON();
            let jo = JSON.parse(data);
            for (let key of Object.keys(jo["KMYMONEY-FILE"])) {
                console.log(key);
            }
        });
    });


}

async function servers() {
    //console.log(application.toString());
    const router_ssl = express();
    const router_cl = express();
    const { PORT_SSL = 4210 } = process.env;
    const { PORT_CL = 4211 } = process.env;
    const server_ssl = createServer(router_ssl);
    const server_cl = createServer(router_cl);

    router_ssl.get('/', (req, res) => {
        //console.log("here");
        res.send('Hello World via ssl!');
    });

    router_cl.get('/', (req, res) => {
        //console.log("here");
        res.send('Hello World via clear http!');
    });

    server_ssl.listen(PORT_SSL, () =>
        console.log(`SSL server is running http://localhost:${PORT_SSL}...`)
    );

    server_cl.listen(PORT_CL, () =>
        console.log(`Clear server is running http://localhost:${PORT_CL}...`)
    );
}

// main();
servers();