<template>
    <b-container id="box">
        <b-row align-h="center" class="p-1">
            <h2>Коробки</h2>
        </b-row>
        <template v-if="show">
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/box/list')" block variant="secondary" size="lg">Список коробок
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="goAddNewBox" block variant="secondary" size="lg">Добавить коробку</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <b-row class="p-1">
                <b-form-select v-model="area" :value="null" :options="areaSelection">
                </b-form-select>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addNewBox" block variant="secondary" size="lg">Добавить коробку</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="goAddNewBox" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import axios from 'axios'
    const config = require("../../config.json");


    export default {
        name: "box",
        data() {
            return {
                area: null,
                show: true,
                areaList: [],
                areaSelection: {},
            }
        },
        created: function () {
            this.getAreaList();
        },
        methods: {
            goAddNewBox() {
                this.show = !this.show;
            },
            addNewBox() {
                if (this.area) {
                    let self = this;
                    let data = {areaName: this.area};
                    axios.post(config.vueConfig.ip + '/box', data).then(function () {
                        self.$router.push('/box/list')
                    })
                }
            },
            getAreaList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/area').then((response) => {
                    self.areaList = response.data;
                    self.generateAreaSelection()
                })
            },
            generateAreaSelection() {
                let data = {null: 'Выберите зону...'};
                let areas = this.areaList;
                for (let index in areas) {
                    data[areas[index].areaName] = areas[index].areaName;
                }
                this.areaSelection = data;
            },
        }
    }
</script>

<style scoped>

</style>