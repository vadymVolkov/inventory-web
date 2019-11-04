<template>
    <b-container id="search">
        <b-row align-h="center" class="p-1">
            <h2>Поиск по Имени</h2>
        </b-row>
        <template v-if="show">
            <b-row class="p-1">
                <b-col sm="2">
                    <label>Категория:</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input v-model="searchItemName"></b-form-input>
                    <b-form-invalid-feedback :state="valid">
                        В этой категории нету вещей
                    </b-form-invalid-feedback>
                </b-col>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button type="submit" @click="searchItem" block variant="dark" size="lg">Найти</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/search')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <div>
                <b-card no-body>
                    <b-tabs pills card vertical>
                        <b-tab v-for="item in items" v-bind:key="item.id"
                               :title="item.itemName + ' - ID № ' + item.id">
                            <b-card-text>
                                <p>Описание: {{validateDescription(item.itemDescription)}}</p>
                                <p>Категория: {{validateCategory(item.categoryName)}}</p>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
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
        name: "search",
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
                categoryId: null,
                itemName: null,
                itemDescription: null,
                items: [],
                searchItemName: null
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
                let data = {null: 'Выберите категорию...'};
                let categories = this.categoriesList;
                for (let index in categories) {
                    data[categories[index].categoryName] = categories[index].categoryName;
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
            changeItem() {
                let data = {
                    'itemName': this.itemName,
                    "itemDescription": this.itemDescription,
                    'boxId': this.boxId,
                    'categoryId': this.categoryId
                };
                if (data.itemName) {
                    let self = this;
                    axios.put(config.vueConfig.ip + '/item/' + this.itemId, data).then(() => {
                        self.$router.push('/item');
                    })
                }
            },
            searchItem() {
                let self = this;
                if (this.searchItemName) {
                    axios.get(config.vueConfig.ip + '/item/get/fullname?itemName=' + this.searchItemName).then((response) => {
                        if (response.data[0]) {
                            self.items = response.data;
                            self.itemName = response.data.itemName;
                            self.itemDescription = response.data.itemDescription;
                            self.boxId = response.data.boxId;
                            if (response.data.categoryId) {
                                self.categoryId = response.data.categoryId.split(',');
                            } else self.categoryId = null;
                            self.goToSearch()
                        } else {
                            self.valid = false;
                        }
                    });
                } else {
                    self.valid = false;
                }
            },
            validateCategory(categoryName) {
                let arr = [];
                if (categoryName) {
                    arr = categoryName.split(',');
                    let result = '';
                    for (let i = 0; i < arr.length; i++) {
                        result = result + arr[i] + ', ';
                    }
                    return result.slice(0, -2)
                } else {
                    return 'Категория не указана';
                }
            },
            validateDescription(itemDescription) {
                if (itemDescription) {
                    return itemDescription;
                } else {
                    return 'У предмета нету описания'
                }

            },
        }
    }
</script>

<style scoped>

</style>