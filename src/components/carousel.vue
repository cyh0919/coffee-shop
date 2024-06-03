<template>
    <div class="carousel-container">
        <el-carousel :height="carouselHeight + 'px'" :interval="8000">
            <el-carousel-item v-for="(image, index) in images" :key="index">
                <img :src="image" class="carousel-image" alt="carousel item" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const images = [
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1503481766315-7a586b20f66d?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const carouselHeight = ref(350)

const windowWidth = ref(window.innerWidth);

const handleResize = () => {
    windowWidth.value = window.innerWidth;
    changeCarouselHeight();
};

const changeCarouselHeight = () => {
    if (windowWidth.value > 768) {
        carouselHeight.value = 300;
    } else if (windowWidth.value >= 480 && windowWidth.value < 768) {
        carouselHeight.value = 250;
    } else {
        carouselHeight.value = 200;
    }
}

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style>
.carousel-container {
    margin: 0px;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel-height {
    height: 350px;
}

@media (max-width: 480px) {
    .carousel-height {
        height: 250px;
    }
}
</style>