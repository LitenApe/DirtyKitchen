import { toCurrency } from '../toCurrency';

const testValues = [0.2, 123.2, 1234.2, 1234567.2];

function appendResult(locale: string) {
  return testValues.map((value) => [
    value,
    Intl.NumberFormat(locale).format(value),
  ]);
}

describe('converts to norwegian format by default', () => {
  test.each(appendResult('nb-NO'))('converts %d to %s', (value, result) => {
    expect(toCurrency()(value as number)).toBe(result);
  });
});

describe('converts to other formats format when specified', () => {
  test.each(appendResult('en-IN'))(
    '[en-IN] converts %d to %s',
    (value, result) => {
      expect(toCurrency('en-IN')(value as number)).toBe(result);
    },
  );

  test.each(appendResult('ja-JP'))(
    '[ja-JP] converts %d to %s',
    (value, result) => {
      expect(toCurrency('ja-JP')(value as number)).toBe(result);
    },
  );

  test.each(appendResult('de-DE'))(
    '[de-DE] converts %d to %s',
    (value, result) => {
      expect(toCurrency('de-DE')(value as number)).toBe(result);
    },
  );

  test('confirms that the various locales differ', () => {
    const number = 123456.789;
    const no = toCurrency('nb-NO')(number);
    const en = toCurrency('en-IN')(number);
    const ja = toCurrency('ja-JP')(number);
    const de = toCurrency('de-DE')(number);

    expect(no).not.toBe(en);
    expect(en).not.toBe(ja);
    expect(ja).not.toBe(de);
  });
});
