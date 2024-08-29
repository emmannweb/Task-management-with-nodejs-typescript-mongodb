declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: "development" | "production";
      DATABASE: string;
      JWT_SECRET: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_EMAIL: string;
      SMTP_PASSWORD: string;
      BASE_URL: string;
    }
  }
}

export {};
