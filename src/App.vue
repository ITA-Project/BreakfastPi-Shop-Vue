<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import productService from '@/service/product'
export default {
  name: 'App',
  mounted () {
    productService.getAll()
  }
}
</script>

<style>
</style>
