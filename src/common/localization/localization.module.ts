import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LocalizeResponseInterceptor } from './interceptors/localize-response.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LocalizeResponseInterceptor,
    },
  ],
})
export class LocalizationModule {}