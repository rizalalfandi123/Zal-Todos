/// <reference types="vite/client" />
interface ImportMetaEnv {
 readonly VITE_HOST_ADDRESS: string;
}

interface ImportMeta {
 readonly env: ImportMetaEnv;
}
