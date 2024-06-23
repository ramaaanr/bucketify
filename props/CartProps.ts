export default interface Cart {
  id_keranjang: number;
  created_at: string; // Date stored as a string
  jumlah_pesanan: number;
  total_harga: number;
  catatan: string;

  // Produk
  nama_produk: string;
  foto_produk: string;
  kode_produk: string;
  status_produk: string;

  // Toko
  id_toko: string;
  foto_profil: string;
  nama_toko: string;
}
