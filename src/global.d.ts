export {};

declare global {
  interface Document {
    getElementById<T extends HTMLElement>(id: string): T | null;
  }
}
