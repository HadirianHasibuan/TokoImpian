<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const error = ref('');

function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    // simulasi login
    localStorage.setItem('user', 'admin');
    window.location.href = '/admin';
  } else {
    error.value = 'Login gagal. Coba admin/admin';
  }
}
</script>
