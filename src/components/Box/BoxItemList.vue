<template>
    <b-container id="box-item-list">
        <b-row align-h="center" class="p-1">
            <h2>Список вещей в коробке:</h2>
        </b-row>
        <div class="list-group" id="myList" role="tablist">
            <template v-if="itemsList[0]">
                <b-card no-body>
                    <b-tabs pills card vertical>
                        <b-tab v-for="item in itemsList" v-bind:key="item.id"
                               :title="item.itemName + ' - ID № ' + item.id">
                            <b-card-text>
                                <p>Описание: {{validateDescription(item.itemDescription)}}</p>
                                <p>Категория: {{validateCategory(item.categoryName)}}</p>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </template>
            <template v-else>
                <b-row align-h="center" class="p-1">
                    <h2>Коробка Пустая</h2>
                </b-row>
            </template>
        </div>
        <b-row align-h="center" class="p-1">
            <b-button @click="$router.push('/box/edit/' + $route.params.id)" block variant="danger" size="lg">Назад
            </b-button>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");

    export default {

        name: "box-item-list",
        data() {
            return {
                itemsList: [],
                itemCategory: {},
                categoryList: {},
            }
        },
        created: function () {
            this.getItemsList();
        },
        methods: {
            getItemsList() {
                let self = this;
                axios.get(config.vueConfig.ip + '/box/items/' + this.$route.params.id).then(function (respond) {
                    self.itemsList = respond.data;
                });
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