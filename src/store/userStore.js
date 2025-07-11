import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: null
  }),

  actions: {
    async login(username, password) {
      const res = await axios.get(`https://pbk-warung-api-production-79f4.up.railway.app/api/users?username=${username}&password=${password}`);
      if (res.data.length === 0) {
        throw new Error('Username atau password salah');
      }
      this.currentUser = res.data[0];
    },

    logout() {
      this.currentUser = null;
    }
  }
});
