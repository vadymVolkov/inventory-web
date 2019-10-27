<template>
    <b-container id="search">
        <b-row align-h="center" class="p-1">
            <h2>Поиск</h2>
        </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/search/item')" block variant="dark" size="lg">Поиск вещи по номеру</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/search/item/name')" block variant="dark" size="lg">Поиск вещи по имени</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/search/item/category')" block variant="dark" size="lg">Поиск вещей по категории</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
    </b-container>
</template>
<script>
    export default {
        name: "search",
        data() {
            return {
                show: 0,
            }
        },
        methods: {
            searchItemById() {
                this.show = 1
            },
            searchItemByName() {
                this.show = 2
            },
            searchItemByCategory() {
                this.show = 3
            },
            goBack(){
                this.show = 0
            }
        }
    }
</script>

<style scoped>

</style>