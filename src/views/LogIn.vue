<template>
    <div id="root-login">
        <form method="post" @submit.prevent="onSubmit" v-if="!isLogged">
            <h2>Авторизация</h2>
            <input type="text" v-model="login">
            <input type="password" v-model="password">
            <button type="submit">Log in</button>
        </form>
        <h2 v-else>Уже авторизован :)</h2>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'LogIn',
    data() {
        return {
            login    : '',
            password : '',
            url      : `http://localhost:8080`
        }
    },
    computed: {
        ...mapGetters(['isLogged']),
    },
    methods: {
        ...mapActions(['addUser']),
        async onSubmit() {

            let req = {
                login: this.login,
                pass: this.password
            }

            let response = await fetch(`${this.url}/log_in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            })

            let data = await response.json()

            if(data && data.length != 0 && data.logged) {
                this.addUser(data)
                this.$router.push('/user')
            }
        }
    }
}
</script>

<style lang="less" scoped>
form {
  width: 40%;
  max-width: 550px;
  margin: 20px auto 0 auto;
  border: 1px solid #ccc;
  padding: 15px;
  box-sizing: border-box;
  
  input {
    width: 80%;
    display: block;
    margin: 10px auto;
    border-radius: 8px;
    padding: 6px;
    outline: none;
  }
}
</style>