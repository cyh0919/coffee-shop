<template>
    <div class="product-container">
        <div class="product-card" v-for="(item, index) in filterCoffee" :key="index">

            <router-link :to="{ name: 'ProductDetail', query: { id: index } }">
                <div class="card-top">
                    <img :src="item.img" :alt="item.title" />
                </div>
                <p class="card-title">{{ item.title }}</p>

                <div class="card-bottom">
                    <span class="card-price">$ {{ item.price }}</span>
                </div>
            </router-link>
            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="card-cart" @click="popupProduct(item)" />
        </div>

        <!-- popupProduct -->
        <div v-if="visible" class="dialog-overlay">
            <div class="dialog-content">
                <font-awesome-icon :icon="['fas', 'xmark']" class="popupProduct-xmark" @click="closePopup" />
                <div class="popupProduct-row">
                    <img :src="productItem.img" class="popupProduct-img" />
                    <div class="popupProduct-column">
                        <p class="popupProduct-title">{{ productItem.title }}</p>
                        <p class="popupProduct-price">$ {{ productItem.price * cartNumber }}</p>
                        <p class="popupProduct-row">
                            <span class="popupProduct-btn" @click="decrement">-</span>
                            <span class="popupProduct-number">{{ cartNumber }}</span>
                            <span class="popupProduct-btn" @click="increment">+</span>
                        </p>
                        <button @click="confirm" class="custom-confirm-button-class">加入購物車</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { coffee } from '../assets/coffee.json';
import { useCartStore } from '../stores/useCartStore';


//接收父層篩選器類型
const props = defineProps({
    typeFilter: {
        type: String,
        default: '全部'
    }
});

//計算篩選器 filterCoffee
const filterCoffee = computed(() => {
    if (props.typeFilter === '全部') {
        return coffee;
    }
    return coffee.filter(coffee => coffee.type.includes(props.typeFilter));
});

//popup-product
const cartNumber = ref(1);  //購買數量
const visible = ref(false);  //popup vidible
let productItem = reactive({});  //被點選加入購物車的product

const popupProduct = (item) => {
    productItem = item;
    visible.value = true;
};

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

const confirm = () => {
    visible.value = false;
    productItem.num = cartNumber.value

    cart.pushItem(productItem)

    cartNumber.value = 1;
    productItem.value = {};
};

const closePopup = () => {
    visible.value = false;
    productItem.value = {};
    cartNumber.value = 1;
}

</script>


<style>
.product-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    /* 間距 */
}

.product-card {
    border: 0px solid var(--main-black);
    padding: 10px;
    border-radius: 4px;
}

.product-card:hover {
    -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
}

.card-top img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--main-black);
}

.card-bottom {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
}

.card-price {
    color: var(--main-brown);
    font-weight: 600;
}

.card-cart {
    font-size: 14px;
    color: var(--main-white);
    background: var(--main-black);
    padding: 5px 10px;
    border-radius: 4px;
    display: block;
    width: 14px;
    margin-left: auto;
}

/* popupProduct */
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.dialog-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
}

.popupProduct-xmark {
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    color: var(--main-dark-gray);
    margin-bottom: 5px;
}

.popupProduct-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
}

.popupProduct-column {
    display: flex;
    flex-direction: column;
}

.popupProduct-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.popupProduct-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.popupProduct-price {
    color: var(--main-brown);
    font-weight: 600;
    flex: 1;
}


.popupProduct-number {
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popupProduct-btn {
    cursor: pointer;
    font-size: 25px;
    background: var(--main-black);
    color: var(--main-white);
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
    /* standard syntax */
    -webkit-user-select: none;
    /* for Chrome、Safari */
    -moz-user-select: none;
    /* for Mozilla、Firefox */
}

.popupProduct-btn:hover {
    -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
}

.custom-confirm-button-class {
    background: var(--main-black);
    color: var(--main-white);
    border: 0;
    height: 32px;
    margin-top: 10px;
}

.custom-confirm-button-class:focus-visible {
    outline: none;
}

.custom-confirm-button-class:hover {
    background: var(--main-dark-gray);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
}

@media (max-width: 768px) {
    .product-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
    }
}

@media (max-width: 480px) {
    .product-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0;
    }
}
</style>