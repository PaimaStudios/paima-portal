import { bool, cleanEnv, json, str } from "envalid";

const env = cleanEnv(process.env, {
  REACT_APP_TESTNET: bool(),
  REACT_APP_WALLET_CONNECT_PROJECT_ID: str(),
  REACT_APP_WAGMI_TRANSPORTS: json<Record<string, string>>(),
  REACT_APP_ALCHEMY_API_KEYS: json<Record<string, string>>(),
  REACT_APP_LAUNCHPAD_BACKEND_URL: str(),
  REACT_APP_ENABLE_LAUNCHPAD: bool(),
});

export default env;
