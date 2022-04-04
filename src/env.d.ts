/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}