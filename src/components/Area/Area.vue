<template>
    <b-container id="area-main">
        <b-row align-h="center" class="p-1">
            <h2>Зоны</h2>
        </b-row>
        <template v-if="show">
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/area/list')" block variant="info" size="lg">Список зон</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addArea" block variant="info" size="lg">Добавить зону</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <b-row align-h="center" class="p-1">
                <b-input v-model="newAreaName" type="text" name="areaNameForm"
                         placeholder="Укажите имя"></b-input>
                <b-form-invalid-feedback :state="valid">
                    Укажите имя для зоны
                </b-form-invalid-feedback>
                <b-form-invalid-feedback :state="valid2">
                    Зона с таким именем уже существует
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addAreaNew" block variant="info" size="lg">Добавить</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addArea" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");

    export default {
        name: "area-main",
        data() {
            return {
                newAreaName: '',
                show: true,
                valid: true,
                valid2: true
            }
        },
        created: function () {
        },
        methods: {
            addArea() {
                this.show = !this.show
            },
            addAreaNew() {
                let self = this;
                if (!this.newAreaName) {
                    self.valid2 = true;
                    self.valid = false;
                } else {
                    let dataFile = {'areaName': this.newAreaName};
                    axios.post(config.vueConfig.ip + '/area', dataFile)
                        .then(function () {
                            self.addArea();
                        })
                        .catch(() => {
                            self.valid1 = true;
                            self.valid2 = false
                        })
                }
            },
        }
    }
</script>

<style scoped>

</style>