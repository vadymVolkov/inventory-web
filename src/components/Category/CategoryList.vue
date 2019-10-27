<template>
    <b-container id="category-list">
        <b-row align-h="center" class="p-1">
            <h2>Список Категорий</h2>
        </b-row>
        <b-row v-if="loading" align-h="center" class="p-1">
            <Loader/>
        </b-row>
        <b-container v-else>
            <template v-if="categoryList">
                <b-row align-h="center" class="p-1" v-for="category in categoriesList" v-bind:key="category.id">
                    <b-button @click="$router.push('/category/edit/'+category.id)" block variant="success" size="lg">
                        {{category.categoryName}}
                    </b-button>
                </b-row>
            </template>
            <template v-else>
                <p> Категорий нету</p>
            </template>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/category')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>
    import axios from 'axios'
    import Loader from "@/components/Loader/Loader";
    const config = require("../../config.json");


    export default {
        name: "category-list",
        data() {
            return {
                categoryList: [],
                loading: true
            }
        },
        created: function () {
            this.getCategoryList();
        },
        components: {
            Loader
        },
        methods: {
            getCategoryList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/category').then((response) => {
                    self.loading = false;
                    self.categoriesList = response.data;
                })
            },
        }
    }
</script>

<style scoped>

</style>