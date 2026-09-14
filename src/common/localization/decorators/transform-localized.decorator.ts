import { Transform, plainToInstance, ClassConstructor } from 'class-transformer';

export function ParseJsonField<T>(cls: ClassConstructor<T>) {
  return Transform(({ value }) => {
    let parsed = value;

    if (typeof value === 'string') {
      try {
        parsed = JSON.parse(value);
      } catch {
        return value; // let class-validator report the actual validation error
      }
    }

    return plainToInstance(cls, parsed);
  });
}