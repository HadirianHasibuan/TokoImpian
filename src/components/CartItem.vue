<template>
  <div class="cart-item">
    <img :src="item.image || placeholderImage" alt="produk" />
    <div class="info">
      <h3>{{ item.name }}</h3>
      <p>Harga: Rp {{ item.price.toLocaleString() }}</p>
      <button @click="handleDelete">Hapus</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: Object,
  onDelete: {
    type: Function,
    required: true
  }
});

const placeholderImage = computed(() => 'https://via.placeholder.com/150?text=Produk');

function handleDelete() {
  props.onDelete(props.item);
}
</script>

<style scoped>
.cart-item {
  width: 220px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
}

.cart-item:hover {
  transform: translateY(-4px);
}

.cart-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.cart-item .info {
  text-align: center;
}

.cart-item h3 {
  margin: 8px 0 4px;
  font-size: 1.1rem;
}

.cart-item p {
  margin: 0 0 8px;
  color: #333;
}

.cart-item button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.cart-item button:hover {
  background-color: #c82333;
}
</style>
