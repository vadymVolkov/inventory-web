<template>
    <b-container id="category">
        <b-row align-h="center" class="p-1">
            <h2 v-show="show">Категории</h2>
            <h2 v-show="!show">Добавить Категорию</h2>
        </b-row>
        <template v-if="show">
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/category/list')" block variant="success" size="lg">Список категорий
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addCategory" block variant="success" size="lg">Добавить категорию</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <b-row align-h="center" class="p-1">
                <b-input v-model="newCategoryName" type="text" name="categoryNameForm"
                         placeholder="Укажите имя"></b-input>
                <b-form-invalid-feedback :state="valid1">
                    Категория с таким именем уже существует!
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addCategoryNew" block variant="success" size="lg">Добавить</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="addCategory" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>

    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");

    export default {
        name: "category",
        data() {
            return {
                newCategoryName: '',
                show: true,
                valid1: true,
            }
        },
        created: function () {
        },
        methods: {
            addCategory() {
                this.show = !this.show
            },
            addCategoryNew() {
                let self = this;
                if (!this.newCategoryName) {
                    this.addCategory();
                } else {
                    let dataFile = {'categoryName': this.newCategoryName};
                    axios.post(config.vueConfig.ip + '/category', dataFile)
                        .then(function () {
                        self.addCategory();
                    })
                        .catch(() => {
                            self.validation1();
                        })
                }
            },
            validation1() {
                this.valid1 = false;
            },
        }
    }
</script>

<style scoped>

</style>