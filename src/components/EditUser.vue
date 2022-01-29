<template>
    <div id="root-edit">
        <form @submit.prevent="editUserForm">
            <label for="newLogin">Новый логин</label>
            <input type="text" v-model="newLogin" id="newLogin">
            <label for="oldLogin">Текущий логин</label>
            <input type="text" v-model="oldLogin" id="oldLogin">
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'EditUser',
    data() {
        return {
            newLogin: '',
            oldLogin: ''
        }
    },
    computed: {
        ...mapGetters([ 'getUserLogin', 'isLogged', 'isAdmin' ]),
    },
    methods: {
        ...mapActions([ 'editUser' ]),
        editUserForm() {
            // console.log(this.getUserLogin, this.oldLogin)
            if(this.getUserLogin == this.oldLogin && this.newLogin != '') {
                const user = {
                    isLogged: this.isLogged,
                    isAdmin: this.isAdmin,
                    newLogin: this.newLogin,
                    oldLogin: this.oldLogin
                }
                // console.log(user)

                this.editUser(user)
                this.$emit('userEdited')
            }
            else {
                console.error('Ошибка!')
            }
        }
    },
    watch: {
        isLogged(val) {
            if(!val)
                this.$router.push({ path: '/login' })
        }
    },
}
</script>

<style lang="less" scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;

    input {
        padding: 8px;
        margin: 10px;
        box-sizing: border-box;
        outline: none;
    }
}
</style>