const BASE_API = process.env.NEXT_PUBLIC_API_URL;
const API_PENGGUNA = `${BASE_API}/pembeli`;
const API_KATALOG = `${BASE_API}/katalogs`;
const API_PRODUCT_IMG = `${BASE_API}/product_images`;
const API_ORDER = `${BASE_API}/order`;
const API_TOKO = `${BASE_API}/toko`;
const API_WISHLIST = `${BASE_API}/wishlist`;
const API_CART = `${BASE_API}/keranjang`;
const API_KEY: any = process.env.API_KEY;
const STORE_IMAGES = `${BASE_API}/store_images`;
const HEADERS = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
};

export {
  STORE_IMAGES,
  API_TOKO,
  BASE_API,
  API_PENGGUNA,
  API_KATALOG,
  API_ORDER,
  API_CART,
  API_KEY,
  HEADERS,
  API_PRODUCT_IMG,
  API_WISHLIST,
};
