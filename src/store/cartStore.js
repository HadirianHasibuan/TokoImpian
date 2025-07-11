import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [],
    orders: []
  }),

  actions: {
    async fetchCart() {
      try {
        const res = await axios.get('https://pbk-warung-api-production-79f4.up.railway.app/api/cart');
        this.cartItems = res.data;
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },

    async addToCart(item) {
      try {
        await axios.post('https://pbk-warung-api-production-79f4.up.railway.app/api/cart', item);
        await this.fetchCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },

    async removeFromCart(id) {
      try {
        await axios.delete(`https://pbk-warung-api-production-79f4.up.railway.app/api/cart/${id}`);
        await this.fetchCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },

    async clearCart() {
      try {
        const res = await axios.get('https://pbk-warung-api-production-79f4.up.railway.app/api/cart');
        const items = res.data;
        for (const item of items) {
          await axios.delete(`https://pbk-warung-api-production-79f4.up.railway.app/api/cart/${item.id}`);
        }
        this.cartItems = [];
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },

    async checkout() {
      if (this.cartItems.length === 0) {
        alert('Keranjang kosong!');
        return;
      }

      // Buat order dengan satu ID dan array items
      const newOrder = {
        id: uuidv4(),
        items: this.cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size
        }))
      };

      try {
        await axios.post('https://pbk-warung-api-production-79f4.up.railway.app/api/orders', newOrder);
        await this.clearCart();
        await this.fetchOrders();
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    },

    async fetchOrders() {
      try {
        const res = await axios.get('https://pbk-warung-api-production-79f4.up.railway.app/api/orders');
        this.orders = res.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },

    async cancelOrder(id) {
      try {
        await axios.delete(`https://pbk-warung-api-production-79f4.up.railway.app/api/orders/${id}`);
        await this.fetchOrders();
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  }
});
