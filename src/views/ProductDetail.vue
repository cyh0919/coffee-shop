<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="imgCover" alt="" />
      <div class="product-detailImage">
        <img :src="product.img" @click="changeImage(product.img)" />
        <img v-for="(imgSrc, index) in product.detaiImages" :key="index" :src="imgSrc" @click="changeImage(imgSrc)">
      </div>
    </div>
    <div class="product-info">
      <h1>{{ product.title }}</h1>
      <p class="product-price">Price: ${{ product.price }}</p>
      <p class="product-cart-row">
        <span class="product-cart-btn" @click="decrement">-</span>
        <span class="popupProduct-number">{{ cartNumber }}</span>
        <span class="product-cart-btn" @click="increment">+</span>
        <button class="product-cart-addCart" @click="addCart">加入購物車</button>
      </p>
      <p class="product-price">產品描述</p>
      <p class="product-text">{{ product.introduction }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { coffee } from '../assets/coffee.json';
import { useCartStore } from '../stores/useCartStore';


const route = useRoute();
const productId = route.query.id;
const product = reactive(coffee[productId])
const cartNumber = ref(1)

//點擊換圖片
const imgCover = ref(product.img)

const changeImage = (imgSrc) => {
  imgCover.value = imgSrc;
}

const increment = () => { //增加數量
  cartNumber.value++;
};

const decrement = () => {
  if (cartNumber.value > 1) { //減少數量
    cartNumber.value--;
  }
};

//cart store
const cart = useCartStore();
const addCart = () => {
  product.num = cartNumber;
  
  cart.pushItem(product)
};
</script>

<style scoped>
.product-detail {
  margin: auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
}

.product-image {
  border-radius: 0px 0px 10px 10px;
  padding: 60px 60px 40px 60px;
  background: var(--main-black);
}

.product-image img {
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
}

.product-detailImage {
  width: 500px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  background: var(--main-dark-gray);
  border-radius: 10px;
  margin-top: 10px;
}

.product-detailImage img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex: 0 0 100px;
  cursor: pointer;
}

/* Webkit-based browsers (Chrome, Safari) */
.product-detailImage::-webkit-scrollbar {
  height: 8px;
  /* 滾動條的高度 */
}

.product-detailImage::-webkit-scrollbar-thumb {
  background-color: var(--main-white);
  border-radius: 10px;
}

.product-detailImage::-webkit-scrollbar-track {
  background-color: var(--main-black);
  border-radius: 10px;
}

.product-info {
  width: 620px;
}

.product-info h1 {
  font-weight: 400;
  margin: 60px 0 20px;
}

.product-info p {
  font-weight: 400;
}

.product-price {
  font-size: 16px;
}

.product-text {
  line-height: 2;
  color: var(--main-dark-gray);
  margin-top: 15px;
}

.product-cart-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
}

.product-cart-btn {
  width: 40px;
  height: 40px;
  border-radius: 45px;
  display: flex;
  background: var(--main-gray);
  color: var(--main-black);
  font-size: 16px;
  justify-content: center;
  align-items: center;
  transition: background-color ease-in .1s;
}

.product-cart-addCart {
  background: var(--main-white);
  border: 1px solid var(--main-black);
  border-radius: 4px;
  width: 250px;
  height: 45px;
  margin-left: 15px;
  transition: background-color ease-in .1s;
}

.product-cart-addCart:hover,
.product-cart-btn:hover {
  -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  background: var(--main-black);
  color: var(--main-white);
  transition: background-color ease-in .1s;
}
</style>
