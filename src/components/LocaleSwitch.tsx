import { useLocale } from '../i18n/useLocale';

/**
 * A single button rather than a select: there are exactly two locales, so the
 * control can name the destination ("العربية" / "English") and needs no menu.
 *
 * `lang` is set on the button because its label is written in the language it
 * switches *to* — without it a screen reader announces Arabic text with an
 * English voice.
 */
export function LocaleSwitch() {
  const { content, locale, toggleLocale } = useLocale();
  const target = locale === 'en' ? 'ar' : 'en';
  return (
    <button
      type="button"
      onClick={toggleLocale}
      lang={target}
      className="rounded-full border border-line px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-accent/50 hover:text-white"
    >
      {content.ui.localeSwitchLabel}
    </button>
  );
}
