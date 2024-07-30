export interface globalThis {}
declare module globalThis {
  var __MONGO_URI__: string;
  var __MONGO_DB_NAME__: string;
}

export interface global {}
declare global {
  var __MONGO_URI__: string;
  var __MONGO_DB_NAME__: string;
}
