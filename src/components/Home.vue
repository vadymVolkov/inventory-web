<template>
    <b-container id="home">
        <b-row align-h="center" class="p-1">
            <h2>Главная</h2>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/category')" block variant="primary" size="lg">Категории</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/item')" block variant="primary" size="lg">Вещи</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/box')" block variant="primary" size="lg">Коробки</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/area')" block variant="primary" size="lg">Зоны</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/search')" block variant="primary" size="lg">Поиск</b-button>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "home"
    }
</script>
