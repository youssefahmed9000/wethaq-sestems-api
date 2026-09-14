import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKIP_LOCALIZE_KEY } from '../decorators/skip-localize.decorator';
import { localizeDeep, resolveLocale } from '../utils/localize.util';

@Injectable()
export class LocalizeResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_LOCALIZE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) return next.handle();

    const request = context.switchToHttp().getRequest();
    const locale = resolveLocale(request);

    return next.handle().pipe(map((data) => localizeDeep(data, locale)));
  }
}