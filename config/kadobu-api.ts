const BASE_API = process.env.NEXT_PUBLIC_API_URL;
const API_PENGGUNA = `${BASE_API}/pembeli`;
const API_KATALOG = `${BASE_API}/katalogs`;
const API_PRODUCT_IMG = `${BASE_API}/product_images`;
const API_ORDER = `${BASE_API}/order`;
const API_KEY: any = process.env.API_KEY;
const HEADERS = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

export {
  BASE_API,
  API_PENGGUNA,
  API_KATALOG,
  API_ORDER,
  API_KEY,
  HEADERS,
  API_PRODUCT_IMG,
};
