<template>
  <div class="login-page">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" />
    <button @click="doLogin">Login</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const userStore = useUserStore();
const router = useRouter();

async function doLogin() {
  try {
    await userStore.login(username.value, password.value);
    // ✅ kalau sukses, redirect ke /admin
    router.push('/admin');
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.login-page input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
}
.login-page button {
  padding: 8px 16px;
}
</style>
