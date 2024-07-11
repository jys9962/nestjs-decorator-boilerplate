export const LogByWrap = function (
  message: string,
): MethodDecorator {
  return (
    _: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalFn = descriptor.value;

    descriptor.value = function (
      this: any,
      ...args: unknown[]
    ) {
      console.log(message);
      return originalFn.apply(this, args);
    };

    Object.defineProperty(descriptor.value, 'name', {
      value: propertyKey.toString(),
      writable: false,
    });
    Object.setPrototypeOf(descriptor.value, originalFn);
  };
};
