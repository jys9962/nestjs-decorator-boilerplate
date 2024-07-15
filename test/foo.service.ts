import { Inject, Injectable } from '@nestjs/common';
import { LogByWrap } from '../src/decorator/log-by-wrap';
import { LogByReflect } from '../src/decorator/log-by-reflect';

@Injectable()
export class FooService {

  constructor() {}

  @LogByWrap('my message')
  execute() {
    return 'result';
  }

  @LogByWrap('my message')
  async asyncExecute() {
    return 'result';
  }

  @LogByReflect({
    message: 'my message',
  })
  loggingByReflect() {
    return 'result';
  }

  @LogByReflect({
    message: 'my message',
  })
  async asyncLoggingByReflect() {
    return 'result';
  }
}
