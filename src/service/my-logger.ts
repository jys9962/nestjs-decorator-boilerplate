import { Inject, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {

  error(
    message: any,
    ...optionalParams: any[]
  ): any {
    console.error()
  }

  log(
    message: any,
    ...optionalParams: any[]
  ): any {}

  warn(
    message: any,
    ...optionalParams: any[]
  ): any {}

}
