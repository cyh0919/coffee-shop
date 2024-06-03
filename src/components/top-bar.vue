<template>
  <div class="top-bar">
    <router-link :to="{ name: 'Home' }" class="logo">
      <font-awesome-icon class="logo-icon" icon="fa-solid fa-mug-hot" />
      <p class="logo-text">森林咖啡</p>
    </router-link>


    <el-badge :value="cart.cartItemNumber" class="cart-item">
      <font-awesome-icon :icon="['fas', 'cart-shopping']" class="cart" @click="changeCartVisible" />
    </el-badge>


    <font-awesome-icon :icon="['fas', 'bars']" class="bar" />
  </div>

  <div class="cart-container" v-if="cartVisible">
    <h1>購物車明細 ( {{ cart.cartItemNumber }} )</h1>
    <div v-for="(item, index) in cart.cartItem" :key="index" class="cart-grid">
      <img :src="item.img" alt="">

      <p class="cart-itemName">{{ item.title }}</p>

      <p class="cart-itemPrice">${{ item.price }}</p>
      <div class="product-cart-row">
        <span class="product-cart-btn" @click="cart.decreaseNum(item.id)">-</span>
        <p>{{ item.num }}</p>
        <span class="product-cart-btn" @click="cart.increaseNum(item.id)">+</span>
      </div>

      <font-awesome-icon :icon="['fas', 'trash-can']" class="cart-delete" @click="deleteCart(item)"/>
    </div>
  </div>
  <div class="cart-container-background" v-if="cartVisible" @click="changeCartVisible"></div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/useCartStore';

//cart store
const cart = useCartStore();

const cartVisible = ref(false);
const changeCartVisible = () => {
  cartVisible.value = !cartVisible.value;
}

const deleteCart = (item) => {
  cart.removeItemById(item.id)
}

</script>

<style>
.top-bar {
  display: flex;
  flex-direction: row;
  background: linear-gradient(rgb(0, 0, 0), rgba(255, 255, 255, 0)), url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  background-repeat: repeat-x;
  color: var(--main-white);
  align-items: center;
  gap: 10px;
  padding: 0 15px;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  padding: 10px 15px;
  margin-right: auto;
  color: var(--main-white);
}

.logo-icon {
  font-size: 32px;
  margin-bottom: 5px;
}

.logo-text {
  font-size: 22px;
}

.cart,
.bar {
  font-size: 22px;
  color: var(--main-white);
}

.cart-item .el-badge__content {
  background-color: var(--main-brown);
}

.cart-container {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  background: var(--main-white);
  width: 400px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-container-background {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #00000075;
}

.cart-grid {
  display: grid;
  grid-template-columns: 100px 1fr 40px;
  grid-template-rows: 30px 20px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    "A B B"
    "A C C"
    "A E D";
  gap: 10px
}

.cart-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  grid-area: A;
}

.cart-itemName {
  grid-area: B;
  font-weight: 600;
  font-size: 15px;
}

.cart-itemPrice {
  grid-area: C;
  color: var(--main-brown);
  font-weight: 600;

}

.cart-delete {
  grid-area: D;
  font-size: 18px;
  display: flex;
  place-items: center;
  margin: auto;
}


.product-cart-btn {
  width: 30px;
  height: 30px;
  border-radius: 45px;
  display: flex;
  background: var(--main-gray);
  color: var(--main-black);
  font-size: 16px;
  justify-content: center;
  align-items: center;
  transition: background-color ease-in .1s;
}

.product-cart-btn:hover {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  background: var(--main-black);
  color: var(--main-white);
  transition: background-color ease-in .1s;
}

.product-cart-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-row: E;
}

.product-cart-row p {
  margin: 0 auto;
}
</style>