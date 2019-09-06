import {FileUtils} from './file-utils';
import { mkdir, appendFile } from 'fs';

export class Logger {

    public ready: Promise<void>;

    constructor(private logDir: string, private logName: string) {
        this.ready = new Promise<void>((resolve) => {
            this._setUp().then(() => {
                resolve();
            });
        });

    }

    private async _setUp() {
        // check the log directory exists
        // console.log("Writing to directory " + logDir);
        if (! await FileUtils.isDirectory(this.logDir)) {
            console.log("creating log directory...");
            await mkdir(this.logDir, { recursive: true }, (err) => {
                if (err)
                    console.log("Error creating directory " + this.logDir);
            });
        }

        // console.log("_setUp completed");
    }

    private _dateStamp() {
        let date = new Date(Date.now());
        let year: string = date.getFullYear().toFixed();
        let month: string = (date.getMonth() + 1).toFixed();
        if (month.length == 1)
            month = "0" + month;
        return year + month;
    }

    private _timeStamp() {
        let date = new Date(Date.now());
        let year: string = date.getFullYear().toFixed();
        let month: string = (date.getMonth() + 1).toFixed();
        if (month.length == 1)
            month = "0" + month;
        let day = date.getDate().toFixed();
        if (day.length == 1)
            day = "0" + day;
        let hour = date.getHours().toFixed();
        if (hour.length == 1)
            hour = "0" + hour;
        let minute = date.getMinutes().toFixed();
        if (minute.length == 1)
            minute = "0" + minute;
        return year + month + day + " " + hour + ":" + minute;
    }

    public async log(line: string) {
        await this.ready;
        await appendFile(this.logDir + "/" + this._dateStamp() + " " + this.logName,
            this._timeStamp() + ": " + line + "\n", (err) => {
                if (err) {
                    console.log("Error trying to write to log file '"
                        + this.logDir + this.logName + ": " + err.message);
                }
            });
    }

} // End of Logger class