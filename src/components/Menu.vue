<template>
    <div id="root-menu">
        <ul class="menu">
            <li v-for="link in links" :key="link.text">
                <router-link :to="link.href" v-if="link.name === 'PersonalArea' && isLogged">{{ link.text }}</router-link>
                <router-link :to="link.href" v-else>{{ link.text }}</router-link>
            </li>
        </ul>
        <span :class="{logged: isLogged, noLogged: !isLogged}">
            <span v-if="isLogged">{{ logged }}</span>
            <span v-else>{{ noLogged }}</span>
        </span>
        <span class="isadmin" v-if="isAdmin">Вы админ :)</span>
        <button class="logout" v-if="isLogged" @click="logOut">Выйти</button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'links' ],
    name: 'Menu',
    data() {
        return {
            logged: 'Авторизован',
            noLogged: 'Не авторизован'
        }
    },
    computed: {
        ...mapGetters(['isLogged', 'isAdmin']),
    },
    methods: {
        ...mapActions(['removeUser']),
        logOut() {
            this.removeUser()
        }
    }
}
</script>

<style lang="less" scoped>
#root-menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.logged,
.isadmin {
    color: green;
    border: 1px solid green;
    padding: 5px;

    & {
        margin-left: 10px;
    }
}
.logout {
    color: orange;
    border: 1px solid orange;
    padding: 5px;
    background-color: #fff;
    margin-left: 10px;
}
.noLogged {
    color: red;
    border: 1px solid red;
    padding: 5px;
}
ul {
    padding: 5px 15px;
    margin: 0;
    list-style-type: none;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    li {
        margin-left: 15px;

        &:first-child {
            margin-left: 0;
        }

        a {
            text-decoration: none;
            color: #fff;
            background-color: rgb(75, 75, 75);
            padding: 8px;
            border-radius: 8px;
            transition: all .22s ease;
        }

        &:hover a {
            color: #000;
            background-color: rgb(211, 211, 211);
        }
    }
}
</style>