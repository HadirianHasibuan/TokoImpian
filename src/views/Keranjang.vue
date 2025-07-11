<template>
  <div class="cart-page">
    <h1>Keranjang Belanja</h1>
    <router-link to="/produk" class="back-link">← Kembali ke Produk</router-link>

    <div v-if="cartStore.cartItems.length === 0" class="empty-message">
      <p>Keranjang kosong. Silakan tambahkan produk.</p>
    </div>

    <div v-else class="cart-grid">
      <div
        v-for="item in cartStore.cartItems"
        :key="item.id"
        class="cart-card"
      >
        <img :src="item.image || placeholderImage" alt="produk" />
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>Harga: Rp {{ item.price.toLocaleString() }}</p>
          <p>Ukuran: {{ item.size }}</p>
          <button @click="hapusItem(item.id)">Hapus</button>
        </div>
      </div>
    </div>

    <button
      v-if="cartStore.cartItems.length"
      class="checkout-btn"
      @click="checkout"
    >Checkout</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useCartStore } from '../store/cartStore';
import axios from 'axios';

const cartStore = useCartStore();
const placeholderImage = computed(() => 'https://via.placeholder.com/150?text=Produk');

onMounted(() => {
  cartStore.fetchCart();
});

function hapusItem(id) {
  cartStore.removeFromCart(id);
}

async function checkout() {
  for (const item of cartStore.cartItems) {
    await axios.post('https://pbk-warung-api-production-79f4.up.railway.app/api/orders', item);
  }
  await cartStore.clearCart();
}
</script>

<style scoped>
.cart-page { padding: 24px; max-width: 1200px; margin: 0 auto; }
h1 { text-align: center; margin-bottom: 16px; color: #333; }
.back-link { display: inline-block; margin-bottom: 16px; color: #007bff; text-decoration: none; }
.cart-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 16px; }
.cart-card { width: 220px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 16px; display: flex; flex-direction: column; align-items: center; }
.cart-card img { width: 150px; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 12px; }
.cart-card .info { text-align: center; }
.checkout-btn { display: block; margin: 24px auto 0; background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
.checkout-btn:hover { background-color: #218838; }
</style>
