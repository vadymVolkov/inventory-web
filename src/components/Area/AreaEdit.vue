<template>
    <b-container id="area-edit">
        <template v-if="show">
            <b-row align-h="center" class="p-1">
                <h2>Зона: {{currentArea.areaName}}</h2>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="changeArea" block variant="info" size="lg">Изменить имя зоны</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="deleteArea" block variant="info" size="lg">Удалить</b-button>
                <b-form-invalid-feedback :state="valid3">
                    Зону удалить нельзя
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/area/list')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <b-row align-h="center" class="p-1">
                <b-input v-model="text" type="text" name="categoryNameForm" placeholder="Укажите новое имя"></b-input>
                <b-form-invalid-feedback :state="valid">
                    Укажите имя для зоны
                </b-form-invalid-feedback>
                <b-form-invalid-feedback :state="valid2">
                    Зона с таким именем уже существует
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="changeAreaName" block variant="info" size="lg"> OK
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="changeArea" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");

    export default {
        name: "area-edit",
        data() {
            return {
                currentArea: {},
                show: true,
                text: '',
                valid: true,
                valid2: true,
                valid3: true
            }
        },
        created: function () {
            this.getAreaById()
        },
        methods: {
            getAreaById() {
                let self = this;
                axios.get(config.vueConfig.ip + '/area/' + this.$route.params.id).then(function (respond) {
                    self.currentArea = respond.data;
                });
            },
            deleteArea() {
                let self = this;
                axios.delete(config.vueConfig.ip + '/area/' + this.$route.params.id)
                    .then(function () {
                        self.$router.push('/area/list');
                    })
                    .catch(() => {
                        self.valid3 = false;
                    })
            },
            changeArea() {
                this.show = !this.show
            },
            changeAreaName() {
                let dataFile = {areaName: this.text};
                let self = this;
                if (this.text) {
                    axios.put(config.vueConfig.ip + '/area/' + this.$route.params.id, dataFile)
                        .then(function () {
                            self.$router.push('/area/list');
                        })
                        .catch(() => {
                            self.valid1 = true;
                            self.valid2 = false;
                        })
                } else {
                    self.valid2 = true;
                    self.valid = false;
                }


            }
        }
    }
</script>

<style scoped>

</style>