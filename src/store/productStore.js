import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    selectedProduct: null
  }),
  actions: {
    async fetchProducts() {
      const res = await axios.get('https://pbk-warung-api-production-79f4.up.railway.app/api/products');
      this.products = res.data;
    },
    async fetchProduct(id) {
      const res = await axios.get(`https://pbk-warung-api-production-79f4.up.railway.app/api/products/${id}`);
      this.selectedProduct = res.data;
    },
    async addProduct(newProduct) {
      await axios.post('https://pbk-warung-api-production-79f4.up.railway.app/api/products', newProduct);
      await this.fetchProducts();
    },
    async deleteProduct(id) {
      await axios.delete(`https://pbk-warung-api-production-79f4.up.railway.app/api/products/${id}`);
      await this.fetchProducts();
    }
  }
});
