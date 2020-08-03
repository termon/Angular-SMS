import { Injectable, OnDestroy } from '@angular/core';
// https://www.codemag.com/Article/1711021/Logging-in-Angular-Applications

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}


@Injectable({
  providedIn: 'root'
})
export class LogService implements OnDestroy {

  level = LogLevel.All;
  logWithDate = true;

  constructor() {
    this.info('LogService', 'Created....');
  }

   debug(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]): void {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  ngOnDestroy(): void {
    this.info('LogService', 'Destroyed...');
  }


  // ------------- private -----------------------
  private writeToLog(msg: string, level: LogLevel, params: any[]): void {
    if (this.shouldLog(level)) {
      let value = '** LOG ' + LogLevel[level].toUpperCase().padEnd(5) + ' ** ';

      // Build log string
      if (this.logWithDate) {
        value += new Date().toUTCString() + ' - ';
      }
      value += msg;

      // stringify when not logging to console
      // if (params.length) {
      //   value += this.formatParams(params);
      // }

      // Log the value and optional params to the  console
      console.log(value, ...params);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.level &&
         level !== LogLevel.Off) ||
         this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

  private formatParams(params: any[]): string {
    let ret = ' {';
    params.forEach(element => {
      ret += ' ' + JSON.stringify(element);
    });
    return ret += ' }';
  }

}

