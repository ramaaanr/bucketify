// File: OrderProps.ts
export interface KeranjangItem {
  id_keranjang: number;
  jumlah_pesanan: number;
  total_harga: number;
  catatan: string;
  kode_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  stok_produk: number;
  harga_produk: number;
  status_produk: string;
  foto_produk: string;
  nama_toko: string;
  id_toko: string;
}

export interface Order {
  id_order: number;
  kode_pesanan: string;
  jenis_pembayaran: string | null;
  status: string;
  total_harga: number;
  id_pembeli: string;
  created_at: string;
  snap_token: string;
  keranjang: KeranjangItem[];
}
