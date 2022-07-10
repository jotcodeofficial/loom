export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_DATASET: string;
      NEXT_PUBLIC_SANITY_PROJECT_ID: string;
      SANITY_API_TOKEN: string;
      NEXT_PUBLIC_HCAPTCHA_SITE_KEY: string;
      HCAPTCHA_SECRET_KEY: string;
      NEXT_PUBLIC_TEST_HCAPTCHA_SITE_KEY: string;
      TEST_HCAPTCHA_SECRET_KEY: string;
      HCAPTCHA_VERIFY_URL: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
