<template>
  <div class="home">
    <h1>Selamat Datang di Toko Sepatu!</h1>
    <div class="product-grid">
      <div
        v-for="product in shuffledProducts"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>Harga: Rp {{ product.price.toLocaleString() }}</p>
        <button class="detail-link" @click="openModal(product)">Lihat Detail</button>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">X</button>
        <img :src="selectedProduct.image" :alt="selectedProduct.name" />
        <h2>{{ selectedProduct.name }}</h2>
        <p><strong>Harga:</strong> Rp {{ selectedProduct.price.toLocaleString() }}</p>
        <p><strong>Deskripsi:</strong> {{ selectedProduct.description }}</p>
        <p><strong>Ukuran Tersedia:</strong> {{ selectedProduct.sizeRange.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const shuffledProducts = ref([])
const selectedProduct = ref(null)

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

onMounted(async () => {
  try {
    const res = await axios.get('https://pbk-warung-api-production-79f4.up.railway.app/api/products')
    products.value = res.data
    shuffledProducts.value = shuffleArray(products.value)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

function openModal(product) {
  selectedProduct.value = product
}

function closeModal() {
  selectedProduct.value = null
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 10px;
}

.product-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.detail-link {
  margin-top: 8px;
  display: inline-block;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.detail-link:hover {
  background-color: #0056b3;
}

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease;
}

.modal-content img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  background: #ff4d4d;
  border: none;
  border-radius: 50%;
  color: white;
  width: 32px;
  height: 32px;
  font-weight: bold;
  cursor: pointer;
}

.close-btn:hover {
  background: #e60000;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
