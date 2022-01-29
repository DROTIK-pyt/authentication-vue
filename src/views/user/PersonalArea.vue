<template>
    <div id="root-personal">
        <div class="infos">
            <div class="info-user">
                <h2>Привет {{ getUserLogin }}!</h2>
                <button @click="showedEditor = true" v-if="!showedEditor">Редактировать</button>
                <EditUser v-if="showedEditor" @userEdited="showedEditor = false"/>
            </div>
            <div class="posts"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditUser from '../../components/EditUser'

export default {
    name: 'PersonalArea',
    data() {
        return {
            showedEditor: false
        }
    },
    components: {
        EditUser
    },
    mounted() {
        if(!this.isLogged)
            this.$router.push({ path: '/login' })
        
        fetch('http://localhost:8888/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.getUserId})
        })
        .then(data => {
            data.json().then(resp => this.$store.state.user.login = resp.login)
        })
        .catch(err => console.log(err))
    },
    watch: {
        isLogged(val) {
            if(!val)
                this.$router.push({ path: '/login' })
        }
    },
    computed: {
        ...mapGetters([ 'getUserLogin', 'getUserId', 'isLogged', 'isAdmin' ]),
    },
}
</script>

<style lang="less" scoped>
.infos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
}
</style>