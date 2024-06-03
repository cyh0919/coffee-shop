import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const cartItem = ref([]);
  const cartItemNumber = computed(() => cartItem.value.length);
  const nextId = ref(0);

  function pushItem(item) {
    // 如果直接賦值給item 裡面的id的話會因為Vue3的reactive system而跟著ref(0)變化數值
    // 創建新對象並且賦值id
    const newItem = { ...item, id: nextId.value };
    nextId.value++;
    cartItem.value.push(newItem);
  }

  function removeItemById(itemId) {
    cartItem.value = cartItem.value.filter(item => item.id !== itemId);
  }

  function increaseNum(itemId) {
    const item = cartItem.value.find(item => item.id === itemId);
    if (item) {
      item.num++;
    }
  }

  function decreaseNum(itemId) {
    const item = cartItem.value.find(item => item.id === itemId);
    if (item && item.num > 1) {
      item.num--;
    }
  }
  return { cartItem, cartItemNumber, pushItem, removeItemById, increaseNum, decreaseNum };
});
