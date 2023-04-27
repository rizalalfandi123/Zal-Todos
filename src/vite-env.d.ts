/// <reference types="vite/client" />
interface ImportMetaEnv {
 readonly GOOGLE_AUTH_CLIENT_ID: string;
 readonly GOOGLE_AUTH_CLIENT_SECRET: string;
}

interface ImportMeta {
 readonly env: ImportMetaEnv;
}