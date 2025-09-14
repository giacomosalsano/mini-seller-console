export enum Locale {
  US = "en-US",
  EU = "pt-PT",
  UK = "en-GB",
  JP = "ja-JP",
  AU = "en-AU",
  CA = "en-CA",
}

function getCurrencyFromLocale(locale: Locale): string {
  switch (locale) {
    case Locale.US:
      return "USD";
    case Locale.EU:
      return "EUR";
    case Locale.UK:
      return "GBP";
    case Locale.JP:
      return "JPY";
    case Locale.AU:
      return "AUD";
    case Locale.CA:
      return "CAD";
    default:
      return "USD";
  }
}

interface FormatCurrencyProps {
  valueInCents: number;
  locale: Locale;
}

export function formatCurrency({
  valueInCents,
  locale,
}: FormatCurrencyProps): string {
  const value = valueInCents / 100;

  return value.toLocaleString(locale, {
    style: "currency",
    currency: getCurrencyFromLocale(locale),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
