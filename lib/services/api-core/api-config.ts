export interface ApiConfig {
  url: string | undefined;
  timeout: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.API_URL,
  timeout: 10000
};
