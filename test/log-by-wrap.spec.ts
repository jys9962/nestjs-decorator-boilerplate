import { Test, TestingModule } from '@nestjs/testing';
import { FooService } from './foo.service';

describe('LogByWrap', () => {
  let app: TestingModule;
  let service: FooService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [FooService],
    }).compile();

    service = app.get(FooService);
  });

  it('기본 설정', async function () {
    expect(service).toBeDefined();
    expect(service.execute.name).toBe('execute');
  });

  it('로그 실행', async function () {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const result = service.execute();

    expect(consoleSpy).toHaveBeenCalledWith('my message');
    expect(result).toBe('result');
  });

  it('비동기 테스트', async function () {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const result = service.asyncExecute();

    expect(consoleSpy).toHaveBeenCalledWith('my message');
    expect(result).toBeInstanceOf(Promise);
    expect(await result).toBe('result');
  });
  ;
});
