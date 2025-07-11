<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/produk">Produk</router-link> |
      <router-link to="/keranjang">Keranjang</router-link> |
      <router-link to="/checkout">Checkout</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
nav {
  padding: 1rem;
  background: #333;
}
nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}
</style>
