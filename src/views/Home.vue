<template> 
  <div class="main-container">

    <SearchBar />
    <Carousel ref="carousel" />
    <br />
    <Product :typeFilter="typeFilter" />
    <ProductAside ref="productAside" :style="productAsideStyle" @filter-change="updateFilterType" />


  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue';
import SearchBar from '../components/search-bar.vue';
import Carousel from '../components/carousel.vue';
import Product from '../components/product.vue';
import ProductAside from '../components/aside.vue';


//調整Aside位置
const carousel = ref(null);
const productAside = ref(null);

const productAsideStyle = reactive({
  top: '0px',
  left: '0px'
});

const productAsidePosition = () => {
  nextTick(() => {
    const mainRect = carousel.value.$el.getBoundingClientRect();
    const productAsideRect = productAside.value.$el.getBoundingClientRect();
    productAsideStyle.top = `${mainRect.top + 15}px`;
    productAsideStyle.left = `${mainRect.left + mainRect.width - productAsideRect.width -15}px`;
  });
};

//商品篩選器
const typeFilter = ref('全部');

onMounted(() => {
  productAsidePosition();
  window.addEventListener('resize', productAsidePosition);
});

const updateFilterType = (type) => {
  typeFilter.value = type;
}


</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-container {
  padding: 0 15px;
  box-sizing: border-box;
  }
}
@media (max-width: 480px)  {

}
</style>
  