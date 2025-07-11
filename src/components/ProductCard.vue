<template>
  <div class="card">
    <img :src="product.image || placeholderImage" alt="sepatu" />
    <h3>{{ product.name }}</h3>
    <p>Harga: Rp {{ product.price }}</p>
    <button @click="tambahKeKeranjang">Tambah ke Keranjang</button>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore';
import { computed } from 'vue';

const props = defineProps({
  product: Object
});

const cartStore = useCartStore();

const placeholderImage = computed(() => 'https://via.placeholder.com/150');

function tambahKeKeranjang(item) {
  cartStore.addToCart({
    productId: item.id,
    name: item.name,
    price: item.price,
    image: item.image
  });
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card img {
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 8px;
}

.card button {
  margin-top: 8px;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.card button:hover {
  background-color: #218838;
}
</style>
