<template>
    <b-container id="category-edit">
        <b-row align-h="center" class="p-1">
            <h2>Категория: {{ currentCategory.categoryName }}</h2>
        </b-row>
        <template v-if="show">
            <b-row align-h="center" class="p-1">
                <b-button @click="changeCategory" block variant="success" size="lg">Изменить название</b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="deleteCategory" block variant="success" size="lg">Удалить
                </b-button>
                <b-form-invalid-feedback :state="valid1">
                    Данную Категорию Невозможно удалить!
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="$router.push('/category/list')" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
        <template v-else>
            <b-row align-h="center" class="p-1">
                <b-input v-model="newNameCategory" type="text" name="categoryNameForm"
                         placeholder="Укажите новое имя"></b-input>
                <b-form-invalid-feedback :state="valid2">
                    Категория с таким именем уже существует!
                </b-form-invalid-feedback>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="changeCategoryName" block variant="success" size="lg"> OK
                </b-button>
            </b-row>
            <b-row align-h="center" class="p-1">
                <b-button @click="changeCategory" block variant="danger" size="lg">Назад</b-button>
            </b-row>
        </template>
    </b-container>
</template>

<script>
    import axios from 'axios'

    const config = require("../../config.json");


    export default {
        name: "category-edit",
        data() {
            return {
                currentCategory: {},
                show: true,
                newNameCategory: '',
                valid1: true,
                valid2: true
            }
        },
        created: function () {
            this.getCategoryById()
        },
        methods: {
            getCategoryById() {
                let self = this;
                axios.get(config.vueConfig.ip + '/category/' + this.$route.params.id).then(function (respond) {
                    self.currentCategory = respond.data;
                });
            },
            deleteCategory() {
                let id = this.$route.params.id;
                let self = this;
                axios.delete(config.vueConfig.ip + '/category/' + id)
                    .then(() => {
                        self.$router.push('/category/list');
                    })
                    .catch(() => {
                        self.validation1();
                    })

            },
            changeCategory() {
                this.show = !this.show
            },
            changeCategoryName() {
                let id = this.$route.params.id;
                let dataFile = {categoryName: this.newNameCategory};
                let self = this;
                axios.put(config.vueConfig.ip + '/category/' + id, dataFile)
                    .then(function () {
                    self.$router.push('/category/list');
                })
                    .catch(() => {
                        self.validation2();
                    })
            },
            validation1() {
                this.valid1 = false;
            },
            validation2() {
                this.valid2 = false;
            }
        }
    }
</script>

<style scoped>

</style>