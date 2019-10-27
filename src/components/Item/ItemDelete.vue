<template>
    <b-container id="item-change">
        <b-row align-h="center" class="p-1">
            <h2>Удалить Вещь</h2>
        </b-row>
        <template v-if="show">
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Номер вещи:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input v-model="itemId"></b-form-input>
                    <b-form-invalid-feedback :state="valid">
                        Неправильны ID номер
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button type="submit" @click="searchItem" block variant="warning" size="lg">Найти</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/item')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Номер вещи:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input readonly v-model="item.id"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Название вещи:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input readonly v-model="itemName" required></b-form-input>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Описание:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-textarea readonly v-model="itemDescription" required></b-form-textarea>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Категория:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-group >
                        <b-form-checkbox-group
                                disabled
                                id="checkbox-group-1"
                                v-model="categoryId"
                                :options="categorySelection"
                                name="flavour-1"
                        ></b-form-checkbox-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Коробка:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-select disabled v-model="boxId" :value="null" :options="boxSelection">
                    </b-form-select>
                </b-col>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button type="submit" @click="deleteItem" block variant="warning" size="lg">Удалить</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="goToSearch" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>

    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");


    export default {
        name: "item-add",
        data() {
            return {
                show: true,
                itemId: '',
                categoriesList: [],
                boxList: [],
                areaList: [],
                categorySelection: {},
                areaSelection: {},
                boxSelection: {},
                item: {},
                valid: true,
                boxId: null,
                categoryName: null,
                categoryId: [],
                itemName: null,
                itemDescription: null,
            }
        },
        created: function () {
            this.getCategoryList();
            this.getBoxList();
        },
        methods: {
            goToSearch() {
                this.show = !this.show;
            },
            getCategoryList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/category').then((response) => {
                    self.categoriesList = response.data;
                    self.generateCategorySelection()
                })
            },
            getBoxList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/box').then((response) => {
                    self.boxList = response.data;
                    self.generateBoxSelection()
                })
            },
            generateCategorySelection() {
                let data = {};
                let categories = this.categoriesList;
                for (let index in categories) {
                    data[categories[index].id] = categories[index].categoryName;
                }
                this.categorySelection = data;
            },
            generateBoxSelection() {
                let data = {null: 'Без коробки'};
                let boxes = this.boxList;
                for (let index in boxes) {
                    data[boxes[index].id] = boxes[index].id;
                }
                this.boxSelection = data;
            },
            deleteItem() {
                let self = this;
                axios.delete(config.vueConfig.ip + '/item/' + self.itemId).then(() => {
                    self.$router.push('/item');
                })
            },
            searchItem() {
                let self = this;
                if (this.itemId) {
                    if (this.itemId) {
                        axios.get(config.vueConfig.ip + '/item/' + this.itemId).then((response) => {
                            if (response.data.id) {
                                self.item = response.data;
                                self.itemName = response.data.itemName;
                                self.itemDescription = response.data.itemDescription;
                                self.boxId = response.data.boxId;
                                if  (response.data.categoryId) {
                                    self.categoryId = response.data.categoryId.split(',');
                                }
                                else self.categoryId = null;
                                self.goToSearch()
                            } else {
                                self.valid = false;
                            }
                        });
                    }
                } else {
                    self.valid = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>