<template>
  <div class="dashboard">
    <h1>Dashboard Admin</h1>
    <nav class="admin-nav">
      <router-link to="/admin/kelola-produk">Kelola Produk</router-link>
    </nav>
    
    <router-view />
  </div>
</template>

<script setup>
// tidak perlu setup script tambahan
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.admin-nav a {
  margin-right: 10px;
  color: rgb(255, 94, 0);
  text-decoration: underline;
}
</style>
