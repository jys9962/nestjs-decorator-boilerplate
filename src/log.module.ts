import { Global, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { LogByReflect } from './decorator/log-by-reflect';
import { wrap } from 'yargs';
import { MyLogger } from './service/my-logger';

@Global()
@Module({
  imports: [
    DiscoveryModule,
  ],
  providers: [
    {
      provide: Logger,
      useValue: console,
    },
  ],
  exports: [
    Logger,
  ],
})
export class LogModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}


  onModuleInit(): any {
    return this
      .discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ metatype, instance }) => {
        const methodNames = this.metadataScanner.getAllMethodNames(Object.getPrototypeOf(instance));
        for (const methodName of methodNames) {
          const option = this.reflector.get<LogByReflect.Option>(LogByReflect.key, instance[methodName]);
          if (!option) {
            continue;
          }

          const originalMethod = instance[methodName];
          instance[methodName] = (...args: any[]) => {
            this.logger.log(option.message);
            return originalMethod.call(instance, ...args);
          };
        }
      });
  }
}
