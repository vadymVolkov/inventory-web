<template>
    <b-container id="item-add">
        <b-row align-h="center" class="p-1">
            <h2>Добавить Вещь</h2>
        </b-row>
        <b-row class="p-1">
            <b-col sm="2">
                <label>Название вещи:</label>
            </b-col>
            <b-col sm="10">
                <b-form-input v-model="itemName" required></b-form-input>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="2">
                <label>Описание:</label>
            </b-col>
            <b-col sm="10">
                <b-form-textarea v-model="itemDescription" required></b-form-textarea>
            </b-col>
        </b-row>
        <b-row class="p-1">
            <b-col sm="2">
                <label>Категория:</label>
            </b-col>
            <b-col sm="10">
                <b-form-group >
                    <b-form-checkbox-group
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
                <b-form-select v-model="boxId" :value="null" :options="boxSelection">
                </b-form-select>
            </b-col>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button type="submit" @click="addItem" block variant="warning" size="lg">Добавить</b-button>
        </b-row>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/item')" block variant="danger" size="lg">Назад</b-button>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'
    const config = require("../../config.json");

    export default {
        name: "item-add",
        data() {
            return {
                categoriesList: [],
                boxList: [],
                categoryId:[],
                itemName: '',
                itemDescription: '',
                categoryName: null,
                boxId: null,
                categorySelection: {},
                areaSelection: {},
                boxSelection: {},

            }
        },
        created: function () {
            this.getCategoryList();
            this.getBoxList();
        },
        methods: {
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
                let data = {null: 'Выберите коробку...'};
                let boxes = this.boxList;
                for (let index in boxes) {
                    data[boxes[index].id] = boxes[index].id;
                }
                this.boxSelection = data;
            },
            addItem() {
                let data = {
                    'itemName': this.itemName,
                    "itemDescription": this.itemDescription,
                    'boxId': this.boxId,
                    'categoryId': this.categoryId,
                };
                if (data.itemName) {
                    let self = this;
                    axios.post(config.vueConfig.ip + '/item', data).then(() => {
                        self.$router.push('/item');
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>