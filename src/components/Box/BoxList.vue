<template>
    <b-container id="box-list">
        <b-row align-h="center" class="p-1">
            <h2>Список Коробок</h2>
        </b-row>
        <b-row v-if="loading" align-h="center" class="p-1">
            <Loader/>
        </b-row>
        <template v-else>
            <b-row align-h="center" class="p-1" v-for="box in boxList" v-bind:key="box.id">
                <b-button @click="$router.push('/box/edit/' + box.id)" block variant="secondary" size="lg">Коробка №
                    {{box.id}}
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/box')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import axios from 'axios'
    import Loader from "@/components/Loader/Loader";
    const config = require("../../config.json");

    export default {
        name: "box-list",
        data() {
            return {
                boxList: [],
                loading: true
            }
        },
        components: {
            Loader
        },
        created: function () {
            this.getCategoryList();
        },
        methods: {
            getCategoryList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/box').then((response) => {
                    self.loading = false;
                    self.boxList = response.data;
                })
            }
        }
    }
</script>

<style scoped>

</style>