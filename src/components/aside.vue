<template>
    <div class="aside-container">
        <span v-for="(item, index) in type" 
        :key="index" 
        :class="{ active: item === selectedTypes }"
        @click="changeType(item)"
        >
            {{ item }}
        </span>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { type } from '../assets/coffee.json';

const selectedTypes = ref('全部');

const changeType = (item) => {
  selectedTypes.value = item;
};
const emit = defineEmits(['filter-change'])

watch(selectedTypes, (newValue) => {
    emit('filter-change', newValue);
});
</script>


<style>
.aside-container {
    display: flex;
    flex-direction: row;
    max-width: 200px;
    position: absolute;
    background: #dbdbdb56;
    overflow: hidden;
    border-radius: 4px;

    padding: 15px;
    backdrop-filter: blur(10px);
}

.aside-container p {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
}

.aside-container span {
    cursor: pointer;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 4px;
    width: 12px;
    color: var(--main-white);
}

.aside-container span:hover {
    background: var(--main-black);
    color: var(--main-white);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
}

.active {
    background: var(--main-black);
    color: var(--main-white);
    -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
}

@media (max-width: 768px) {

}

@media (max-width: 480px)  {
    .aside-container {
        display: none;
        width: 100%;
        max-width: unset;
    }

    .aside-container {
        flex: 1;
        width: unset;
    }
}
</style>
