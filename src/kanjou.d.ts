import type en from './assets/locales/en'

export {}

type EnMessages = typeof en

declare module '@kanjou/react' {
  export interface Messages extends EnMessages {}
  export interface Locales {
    en: true
    uk: true
    ru: true
  }
}
