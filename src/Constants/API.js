export const SHOPPER_URL = 'https://api.chec.io/v1';
export const CHEC_API = process.env.REACT_APP_CHEC_API;
export const HEADERS = {
  "X-Authorization": CHEC_API,
  "Accept": "application/json",
  "Content-Type": "application/json",
}