import { SetMetadata } from '@nestjs/common';


export function LogByReflect(
  option: LogByReflect.Option,
): MethodDecorator {
  return SetMetadata(LogByReflect.key, option);
}


export namespace LogByReflect {
  export const key = Symbol('log-by-reflect');

  export interface Option {
    message: string
  }
}
