<template>
  <div>
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';

const userStore = useUserStore();
const username = ref('');
const password = ref('');

async function login() {
  try {
    await userStore.login(username.value, password.value);
    alert('Login berhasil');
  } catch (e) {
    alert(e.message);
  }
}
</script>
