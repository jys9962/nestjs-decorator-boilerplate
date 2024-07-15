import { Test, TestingModule } from '@nestjs/testing';
import { FooService } from './foo.service';
import { LogModule } from '../src/log.module';
import { Logger } from '@nestjs/common';

describe('LogByReflect', () => {
  let app: TestingModule;
  let service: FooService;
  let logger: Logger;

  beforeAll(async () => {

    app = await Test.createTestingModule({
      imports: [LogModule],
      providers: [
        FooService,
      ],
    }).compile();

    service = app.get(FooService);
    logger = app.get(Logger);

    await app.init();
  });

  it('기본 설정', async function () {
    expect(service).toBeDefined();
  });

  it('로깅', async function () {
    const spyLogger = jest
      .spyOn(logger, 'log')
      .mockReturnValue();

    const result = service.loggingByReflect();

    expect(spyLogger).toHaveBeenCalledWith('my message');
    expect(result).toBe('result');
  });

  it('비동기 테스트', async function () {
    const spyLogger = jest
      .spyOn(logger, 'log')
      .mockReturnValue();

    const result = service.asyncLoggingByReflect();

    expect(spyLogger).toHaveBeenCalledWith('my message');
    expect(result).toBeInstanceOf(Promise);
    expect(await result).toBe('result');
  });

});
