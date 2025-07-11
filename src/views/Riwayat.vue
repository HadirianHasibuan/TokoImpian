<template>
  <div class="riwayat">
    <h1>Riwayat Pesanan</h1>
    <div v-if="orders.length === 0">Belum ada pesanan.</div>
    <div v-else>
      <div
        v-for="order in orders"
        :key="order.id"
        class="order"
      >
        <h2>Order ID: {{ order.id }}</h2>
        
        <div class="items">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="item"
          >
            <p><strong>{{ item.name }}</strong></p>
            <p>Harga: Rp {{ item.price.toLocaleString('id-ID') }}</p>
            <p>Ukuran: {{ item.size }}</p>
          </div>
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
</script>

<style scoped>
.riwayat {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
.order {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9f9f9;
}
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.item {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 6px;
  background: white;
  width: 180px;
}
</style>
