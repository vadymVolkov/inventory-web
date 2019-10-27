<template>
    <b-container id="box-edit">
        <b-row align-h="center" class="p-1">
            <h2>Коробка</h2>
        </b-row>
        <b-row align-h="center" class="p-1">
        </b-row>
        <template v-if="show === 1">
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/box/item/' + $route.params.id)" block variant="secondary"
                          size="lg">Посмотреть список вещей
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="getBoxInfo" block variant="secondary" size="lg">Показать информацию о коробке
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="getQrCode" block variant="secondary" size="lg">Показать QR код коробки</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="setShowFour" block variant="secondary" size="lg">Изменть зону коробки</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button block @click="$router.push('/box/add/item/'+ $route.params.id)" variant="secondary" size="lg">
                    Добавить вещь в коробку
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button block @click="$router.push('/box/delete/item/'+ $route.params.id)" variant="secondary"
                          size="lg">Удалить вещь из коробки
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button block @click="deleteBox" variant="secondary" size="lg">Удалить Коробку</b-button>
                <b-form-invalid-feedback :state="valid">
                    В коробке есть вещи. Удалить нельзя
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/box/list')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else-if="show===2">
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Номер коробки:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input readonly v-model="currentBox.id"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Зона коробки:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input readonly v-model="areaName"></b-form-input>
                </b-col>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="setShowOne" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else-if="show===3">
            <b-row align-h="center" class="p-1">
                <b-row v-show="loading" v-if="loading" align-h="center" class="p-1">
                    <Loader/>
                </b-row>
                <transition>
                    <b-img v-show="!loading" :src="qr" @load="loaded"></b-img>
                </transition>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="setShowOne" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else-if="show===4">
            <b-row class="p-1">
                <b-form-select v-model="area" :value="null" :options="areaSelection">
                </b-form-select>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="changeBoxArea" block variant="secondary" size="lg">Изменить зону коробки</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="setShowOne" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");
    import Loader from "@/components/Loader/Loader";

    export default {
        name: "box-edit",
        data() {
            return {
                currentBox: {},
                show: 1,
                itemsList: [],
                qr: '',
                loading: true,
                area: null,
                areaList: [],
                areaSelection: {},
                valid: true
            }
        },
        components: {
            Loader
        },
        created: function () {
            this.getCurrentBox();
            this.getAreaList();
        },
        computed: {
            areaName: {
                cache: false,
                get: function () {
                    return this.area;
                }
            }
        },
        methods: {
            loaded() {
                this.loading = false
            },
            getCurrentBox() {
                let self = this;
                axios.get(config.vueConfig.ip + '/box/' + this.$route.params.id).then(function (respond) {
                    self.area = respond.data.areaName;
                    self.currentBox = respond.data;
                });
            },
            deleteBox() {
                let self = this;
                axios.delete(config.vueConfig.ip + '/box/' + this.$route.params.id)
                    .then(function () {
                    self.$router.push('/box/list')
                }).catch( () => {
                    self.valid = false
                });
            },
            getQrCode() {
                this.qr = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + config.vueConfig.mainip + '/box/edit/' + this.currentBox.id;
                this.show = 3;
                /*
                let self = this;
                axios.get(config.vueConfig.ip + '/box/' + this.$route.params.id).then(function (respond) {
                    if (respond.data.qr) {
                        self.qr = respond.data.qr;
                    } else {
                        self.qr = ' '
                    }
                    console.log(self.qr);
                    self.show = 3;
                });
                 */
            },
            getAreaList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/area').then((response) => {
                    self.areaList = response.data;
                    self.generateAreaSelection()
                })
            },
            generateAreaSelection() {
                let data = {};
                let areas = this.areaList;
                for (let index in areas) {
                    data[areas[index].areaName] = areas[index].areaName;
                }
                this.areaSelection = data;
            },
            changeBoxArea() {
                let self = this;
                let data = {areaName: this.area};
                axios.put(config.vueConfig.ip + '/box/' + this.$route.params.id, data).then(function () {
                    self.setShowOne()
                })
            },
            setShowOne() {
                this.show = 1;
            },
            setShowFour() {
                this.show = 4;
            },
            getBoxInfo() {
                this.show = 2;
            }
        }
    }
</script>

<style scoped>

</style>