export default interface Order {
  id_order: number;
  created_at: string; // Date stored as a string
  status: string;
  snap_token: string;
  total_harga: number;
  total_pesanan: number;
  nama_produk: string;
  foto_produk: string;
  kode_pesanan: string;
  keterangan: string;
  kode_produk: string;
  nama_toko: string;
  id_toko: string;
  // jenis_pembayaran?: string | null;
  // id_pembeli?: string | null;
}
