import { Logger } from './logger';
import { FileUtils } from './file-utils';
import { readFile } from 'fs';

const logDir = "/home/david/.local/tmymoney";
const logName = "tmymoney.log";

async function main() {
    let logger = new Logger(logDir, logName);

    console.log("Converting the KMyMoney file...");
    let command = "./convert-xml";
    let args = new Array<string>();
    // args.push("../../../kmymoney/KMyMoney_David.xml");
    // args.push(">");
    // args.push("../test.json");
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

main();