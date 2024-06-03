<template>
  <p>{{ cart.cartTtem[0].title }}</p>

</template>

<script setup>
import { useCartStore } from '../stores/useCartStore';
const cart = useCartStore();
</script>