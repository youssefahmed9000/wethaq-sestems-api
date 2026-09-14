export type Locale = 'en' | 'ar';

export function resolveLocale(req: any): Locale {
  const queryLang = req?.query?.lang;
  if (queryLang === 'en' || queryLang === 'ar') return queryLang;

  const header = req?.headers?.['accept-language'];
  if (typeof header === 'string' && header.toLowerCase().startsWith('ar')) return 'ar';

  return 'en';
}

function isPlainObject(value: any): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    (value.constructor === Object || value.constructor === undefined)
  );
}

function isLocalizedField(value: any): boolean {
  return isPlainObject(value) && 'en' in value && 'ar' in value;
}

export function localizeDeep(data: any, locale: Locale): any {
  if (Array.isArray(data)) {
    return data.map((item) => localizeDeep(item, locale));
  }

  if (isPlainObject(data)) {
    if (isLocalizedField(data)) {
      return data[locale] ?? data.en ?? data.ar;
    }
    const result: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      result[key] = localizeDeep(data[key], locale);
    }
    return result;
  }

  return data;
}