<template>
  <div class="riwayat">
    <h1>Riwayat Pesanan</h1>

    <div v-if="orders.length === 0">
      <p>Belum ada pesanan.</p>
    </div>

    <div v-else class="orders">
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-item"
      >
        <img :src="order.image" alt="Produk" />
        <div class="info">
          <p><strong>{{ order.name }}</strong></p>
          <p>Harga: Rp {{ order.price.toLocaleString() }}</p>
          <p>Size: {{ order.size }}</p>
          <button @click="batalkanPesanan(order.id)">
            Batalkan Pesanan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchOrders();
});

const orders = computed(() => cartStore.orders);

function batalkanPesanan(id) {
  if (confirm('Yakin batalkan pesanan ini?')) {
    cartStore.cancelOrder(id);
  }
}
</script>

<style scoped>
.riwayat {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
.orders {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.order-item {
  display: flex;
  gap: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  background: #f9f9f9;
}
.order-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}
.info {
  flex: 1;
}
button {
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #c82333;
}
</style>
