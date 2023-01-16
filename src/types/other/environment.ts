export {};

declare global {
    namespace NodeJS {
        /**
         * Interface for .env file to be recognizable by TypeScript
         */
        interface ProcessEnv {
            [key: string]: any;
            JWT_KEY: string;
            PORT: number;
            DB_HOST: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
        }
    }
}