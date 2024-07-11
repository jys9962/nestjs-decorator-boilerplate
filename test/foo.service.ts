import { Inject, Injectable } from '@nestjs/common'
import { LogByWrap } from '../src/decorator/log-by-wrap';

@Injectable()
export class FooService {

  constructor(

  ) {}


  @LogByWrap('my message')
  execute() {
    return 'result'
  }

  @LogByWrap('my message')
  async asyncExecute() {
    return 'result'
  }
}
