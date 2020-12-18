<template>
  <div>
    <h2>Shop Management Home</h2>
    <br/>
    <router-link :to="{name: 'hello-world'}">
      Go to Hello world
    </router-link>
    <br/>
    <router-link :to="{name: 'product-management'}">
      Go to product manegement
    </router-link>
    <router-view/>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>
