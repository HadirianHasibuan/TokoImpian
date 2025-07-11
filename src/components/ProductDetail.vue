<template>
  <div v-if="product">
    <h2>{{ product.name }}</h2>
    <p>Harga: Rp {{ product.price }}</p>
    <button @click="addToCart">Tambahkan ke Keranjang</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
  productStore.fetchProduct(route.params.id);
});

const product = productStore.selectedProduct;

function addToCart() {
  cartStore.addToCart({ productId: product.id, name: product.name, price: product.price });
}
</script>
