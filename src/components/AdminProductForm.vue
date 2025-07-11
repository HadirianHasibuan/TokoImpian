<template>
  <div class="admin-form">
    <h2>Kelola Produk</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nama Produk:</label>
        <input v-model="product.name" required />
      </div>

      <div class="form-group">
        <label>Harga (Rp):</label>
        <input v-model.number="product.price" type="number" required />
      </div>

      <div class="form-group">
        <label>URL Gambar:</label>
        <input v-model="product.image" />
        <div v-if="product.image" class="image-preview">
          <img :src="product.image" alt="preview" />
        </div>
      </div>

      <div class="form-group">
        <label>Deskripsi Produk:</label>
        <textarea v-model="product.description" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label>Ukuran Tersedia (pisah koma):</label>
        <input v-model="sizeInput" placeholder="Contoh: 39,40,41,42" />
      </div>

      <button type="submit">{{ isEditing ? 'Update Produk' : 'Simpan Produk' }}</button>
      <button v-if="isEditing" type="button" class="cancel-btn" @click="resetForm">Batal Edit</button>
    </form>

    <h3>Daftar Produk</h3>
    <div class="product-grid">
      <div v-for="item in products" :key="item.id" class="product-card">
        <img :src="item.image || placeholderImage" alt="produk" />
        <div class="info">
          <h4>{{ item.name }}</h4>
          <p class="price">Rp {{ item.price.toLocaleString() }}</p>
          <p class="desc">{{ item.description }}</p>
          <p class="sizes">Ukuran: {{ item.sizeRange?.join(', ') }}</p>
          <button @click="editProduk(item)">Edit</button>
          <button @click="hapusProduk(item.id)" class="hapus-btn">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const product = ref({
  id: null,
  name: '',
  price: 0,
  image: '',
  description: ''
});
const sizeInput = ref('');
const products = ref([]);
const isEditing = ref(false);

const placeholderImage = computed(() => 'https://via.placeholder.com/150?text=Produk');

async function fetchProducts() {
  const res = await axios.get('https://pbk-warung-api-production-79f4.up.railway.app/api/products');
  products.value = res.data;
}

async function submitForm() {
  const sizeRange = sizeInput.value
    .split(',')
    .map(s => parseInt(s.trim()))
    .filter(n => !isNaN(n));

  const newProduct = {
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
    description: product.value.description,
    sizeRange
  };

  if (isEditing.value) {
    await axios.put(`https://pbk-warung-api-production-79f4.up.railway.app/api/products/${product.value.id}`, newProduct);
  } else {
    await axios.post('https://pbk-warung-api-production-79f4.up.railway.app/api/products', newProduct);
  }

  await fetchProducts();
  resetForm();
}

function editProduk(item) {
  product.value = { ...item };
  sizeInput.value = item.sizeRange?.join(', ') || '';
  isEditing.value = true;
}

function resetForm() {
  product.value = { id: null, name: '', price: 0, image: '', description: '' };
  sizeInput.value = '';
  isEditing.value = false;
}

async function hapusProduk(id) {
  await axios.delete(`https://pbk-warung-api-production-79f4.up.railway.app/api/products/${id}`);
  await fetchProducts();
}

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.admin-form {
  max-width: 1000px;
  margin: 24px auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.image-preview img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #ffc107;
}

.cancel-btn:hover {
  background-color: #e0a800;
}

.hapus-btn {
  margin-top: 8px;
  background-color: #dc3545;
}

.hapus-btn:hover {
  background-color: #c82333;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
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

.product-card:hover {
  transform: translateY(-4px);
}

.product-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.product-card .info {
  text-align: center;
}

.product-card .price {
  margin: 0 0 4px;
  font-weight: bold;
  color: #333;
}

.product-card .desc, .product-card .sizes {
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
}
</style>
