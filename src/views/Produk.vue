<template>
  <div class="product-page">
    <h2>Daftar Sepatu Bola</h2>
    <div class="grid">
      <div v-for="product in productStore.products" :key="product.id" class="card">
        <img :src="product.image || placeholderImage" alt="sepatu" />
        <h3>{{ product.name }}</h3>
        <p>Harga: Rp {{ product.price.toLocaleString() }}</p>
        <p class="desc">{{ product.description }}</p>
        <div v-if="product.sizeRange?.length">
          <label>Pilih Ukuran:</label>
          <select v-model="selectedSizes[product.id]" required>
            <option disabled value="">Pilih ukuran</option>
            <option v-for="size in product.sizeRange" :key="size">{{ size }}</option>
          </select>
        </div>
        <button
          :disabled="!selectedSizes[product.id]"
          @click="tambahKeKeranjang(product)"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

const productStore = useProductStore();
const cartStore = useCartStore();
const selectedSizes = ref({});

const placeholderImage = computed(() => 'https://via.placeholder.com/150');

onMounted(() => {
  productStore.fetchProducts();
});

function tambahKeKeranjang(product) {
  cartStore.addToCart({
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: selectedSizes.value[product.id]
  });
  selectedSizes.value[product.id] = '';
}
</script>

<style scoped>
.product-page { padding: 24px; max-width: 1200px; margin: 0 auto; }
h2 { text-align: center; margin-bottom: 24px; color: #333; }
.grid { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
.card { border: 1px solid #ccc; border-radius: 8px; padding: 16px; width: 220px; text-align: center; background-color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.card img { max-width: 100%; border-radius: 4px; margin-bottom: 8px; }
.card select { margin-top: 8px; padding: 4px; border-radius: 4px; border: 1px solid #ccc; width: 100%; }
.card button { margin-top: 8px; background-color: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; }
.card button:hover { background-color: #218838; }
.desc { font-size: 0.9rem; color: #555; margin: 8px 0; }
</style>
