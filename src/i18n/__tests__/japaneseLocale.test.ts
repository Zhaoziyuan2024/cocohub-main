import en from '../locales/en';
import ja from '../locales/ja';
import enJson from '../locales/en.json';
import jaJson from '../locales/ja.json';

function flatten(value: unknown, prefix = ''): Record<string, string> {
  const output: Record<string, string> = {};
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return output;

  for (const [key, item] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof item === 'string') output[path] = item;
    else Object.assign(output, flatten(item, path));
  }
  return output;
}

const placeholders = (value: string): string[] =>
  (value.match(/{{\s*[\w]+\s*}}|%\{[\w]+\}/g) ?? []).sort();

function expectParity(source: unknown, translation: unknown, allowedExtras: string[] = []): void {
  const original = flatten(source);
  const localized = flatten(translation);
  const sourceKeys = Object.keys(original).sort();
  const localizedKeys = Object.keys(localized).filter((key) => !allowedExtras.includes(key)).sort();
  expect(localizedKeys).toEqual(sourceKeys);
  for (const key of sourceKeys) {
    expect(localized[key].trim()).not.toBe('');
    expect(placeholders(localized[key])).toEqual(placeholders(original[key]));
  }
}

describe('Japanese locale', () => {
  test('JSON bundle contains all English keys with preserved i18next placeholders', () => {
    expectParity(enJson, jaJson);
  });

  test('runtime bundle covers all settings and sharing translations', () => {
    expectParity(en, ja, ['language.ja']);
    expect(ja.language.ja).toBe('日本語');
  });
});
