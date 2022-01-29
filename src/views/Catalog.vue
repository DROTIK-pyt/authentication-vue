<template>
    <div id="root-catalog">
        <ul class="items menu">
            <li v-for="item in getItems" :key="item.order">
                <h3>{{ item.title }}</h3>
                <span class="short">{{ item.shortDescription }}</span>
                <span class="price">{{ item.price }} P</span>
                <span class="more"><router-link :to="{name: 'Good', params: { item: item } }">Подробнее...</router-link></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([ 'getItems' ])
    }
}
</script>

<style lang="less" scoped>
.items {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style-type: none;

    span {
        display: block;
    }

    .short {
        margin: 10px 0;
    }

    li {
        margin: 15px;
        padding: 15px;
        width: 300px;
        min-height: 250px;
    }
}
</style>