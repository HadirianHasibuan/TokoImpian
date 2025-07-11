<template>
  <div class="admin-dashboard">
    <h2>Selamat Datang, Admin!</h2>
    <p>Gunakan menu di samping untuk mengelola produk sepatu bola.</p>

    <section class="quick-links">
      <router-link to="/admin/kelola-produk">
        ➜ Kelola Produk Sepatu
      </router-link>
    </section>
  </div>
</template>

<script setup>
// tidak perlu tambahan logic
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.quick-links {
  margin-top: 20px;
}

.quick-links a {
  display: inline-block;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.quick-links a:hover {
  background-color: #0056b3;
}
</style>
