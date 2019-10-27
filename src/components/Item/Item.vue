<template>
    <b-container id="item">
        <b-row align-h="center" class="p-1">
            <h2>Вещи</h2>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/item/add')" block variant="warning" size="lg">Добавить вещь</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/item/change')" block variant="warning" size="lg">Изменить вещь</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/item/delete')" block variant="warning" size="lg">Удалить вещь</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/')" block variant="danger" size="lg">Назад</b-button>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "item",
    }
</script>

<style scoped>

</style>