<template>
    <div id="root-payment">
        
        <div ref="cardWrapper" class='card-wrapper'></div>

        <form ref="cardForm" class="cardForm">
            <input ref="number" type="text" name="number" v-model="number">
            <input ref="firstName" type="text" name="first-name" v-model="firstName"/>
            <input ref="lastName" type="text" name="last-name" v-model="lastName"/>
            <input ref="expiry" type="text" name="expiry" v-model="expiry"/>
            <input ref="cvc" type="text" name="cvc" v-model="cvc"/>
        </form>
    </div>
</template>

<script>
import * as Card from "card"

export default {
    data() {
        return {
            number: '',
            firstName: '',
            lastName: '',
            expiry: '',
            cvc: '',
        }
    },
    mounted() {
        
        new Card({ 
            form: this.$refs.cardForm,
            container: this.$refs.cardWrapper,
        })
    }
}
</script>

<style scoped>

</style>