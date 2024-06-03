<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" placeholder="輸入關鍵字..." @input="handleInput" />
    <font-awesome-icon @click="handleSearch" class="search-button" :icon="['fas', 'magnifying-glass']" />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleInput() {
      console.log("handleInput");
    },
    handleSearch() {
      console.log("handleSearch");
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
}

.search-bar input {
  padding: 8px;
  margin-right: 8px;
  border-radius: 20px;
  border: 0px solid var(--main-black);
  background: var(--main-white);
  margin: 10px;
  width: 100%;
  max-width: 560px;

  -webkit-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 3px 0px rgba(50, 50, 50, 0.75);
}

.search-bar .search-button {
  cursor: pointer;
  font-size: 22px;
}
</style>
