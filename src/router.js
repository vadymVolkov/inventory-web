import Vue from 'vue'
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Category from "@/components/Category/Category";
import Item from "@/components/Item/Item";
import Box from "@/components/Box/Box";
import Area from "@/components/Area/Area";
import Search from "@/components/Search/Search";
import CategoryList from "@/components/Category/CategoryList";
import CategoryEdit from "@/components/Category/CategoryEdit";
import ItemAdd from "@/components/Item/ItemAdd";
import ItemChange from "@/components/Item/ItemChange";
import ItemDelete from "@/components/Item/ItemDelete";
import BoxList from "@/components/Box/BoxList";
import AreaList from "@/components/Area/AreaList";
import BoxEdit from "@/components/Box/BoxEdit";
import AreaEdit from "@/components/Area/AreaEdit";
import BoxItemList from "@/components/Box/BoxItemList";
import BoxAddItem from "@/components/Box/BoxAddItem";
import BoxDeleteItem from "@/components/Box/BoxDeleteItem";
import SearchItemById from "@/components/Search/SearchItemById";
import SearchItemByName from "@/components/Search/SearchItemByName";
import SearchItemByCategory from "@/components/Search/SearchItemByCategory";
import SearchItemByFullName from "@/components/Search/SearchItemByFullName";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/category',
            component: Category
        },
        {
            path: '/category/list',
            component: CategoryList
        },
        {
            path: '/category/edit/:id',
            component: CategoryEdit
        },
        {
            path: '/item',
            component: Item
        },
        {
            path: '/item/add',
            component: ItemAdd
        },
        {
            path: '/item/change',
            component: ItemChange
        },
        {
            path: '/item/delete',
            component: ItemDelete
        },
        {
            path: '/box',
            component: Box
        },
        {
            path: '/box/list',
            component: BoxList
        },
        {
            path: '/box/item/:id',
            component: BoxItemList
        },
        {
            path: '/box/edit/:id',
            component: BoxEdit
        },
        {
            path: '/box/add/item/:id',
            component: BoxAddItem
        },
        {
            path: '/box/delete/item/:id',
            component: BoxDeleteItem
        },
        {
            path: '/area',
            component: Area
        },
        {
            path: '/area/list',
            component: AreaList
        },
        {
            path: '/area/edit/:id',
            component: AreaEdit
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/search/item',
            component: SearchItemById
        },
        {
            path: '/search/item/name',
            component: SearchItemByName
        },
        {
            path: '/search/item/category',
            component: SearchItemByCategory
        },
        {
            path: '/search/item/fullname',
            component: SearchItemByFullName
        }
    ]
})