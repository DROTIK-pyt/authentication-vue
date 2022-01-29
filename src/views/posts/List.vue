<template>
    <div id="root-list">
        <h1>List</h1>
        <hr>
        <ul class="posts">
            <li
            
            ></li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'PostList',
    data() {
        return {

        }
    },
    components: {},
    methods: {},
    computed: {
        
    }
}
</script>

<style lang="less" scoped>
table {
    width: 60%;
    min-width: 200px;
    max-width: 1200px;
    margin: 0 auto;
}
table, thead, th, tr, td, tbody {
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
}
</style>