import { SetMetadata } from '@nestjs/common';

export const SKIP_LOCALIZE_KEY = 'skipLocalize';
export const SkipLocalize = () => SetMetadata(SKIP_LOCALIZE_KEY, true);