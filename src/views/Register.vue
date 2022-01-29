<template>
    <div id="root-regiter">
        <form method="post" @submit.prevent="onSubmit">
            <h2>Регистрация</h2>
            <input type="text" v-model="login">
            <input type="password" v-model="password">
            <button type="submit">Sign in</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Register',
    data() {
        return {
            login    : '',
            password : '',
            url      : `http://localhost:8080`
        }
    },
    methods: {
        ...mapActions(['editUser']),
        async onSubmit() {

            let req = {
                login: this.login,
                pass: this.password
            }

            let response = await fetch(`${this.url}/sign_in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            })

            let data = await response.json()
            if(data == 'Data added') {
                this.editUser(req)
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