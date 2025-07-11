<template>
  <div>
    <h2>Daftar Sepatu Bola</h2>
    <div class="grid">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../store/productStore';
import ProductCard from './ProductCard.vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}
</style>
