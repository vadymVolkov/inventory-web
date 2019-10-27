<template>
    <b-container id="area-list">
        <b-row align-h="center" class="p-1">
            <h2>Список Зон</h2>
        </b-row>
        <b-row v-if="loading" align-h="center" class="p-1">
            <Loader/>
        </b-row>
        <b-row align-h="center" class="p-1" v-for="area in areaList" v-bind:key="area.id">
            <b-button @click="$router.push('/area/edit/' + area.id)" block variant="info" size="lg">{{area.areaName}}</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/area')" block variant="danger" size="lg">Назад</b-button>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'
    import Loader from "@/components/Loader/Loader";
    const config = require("../../config.json");

    export default {
        name: "area-list",
        data() {
            return {
                areaList: [],
                loading: true
            }
        },
        created: function () {
            this.getAreaList();
        },
        components: {
            Loader
        },
        methods: {
            getAreaList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/area').then((response) => {
                    self.loading = false;
                    self.areaList = response.data;
                })
            },
        }
    }
</script>

<style scoped>

</style>