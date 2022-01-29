<template>
    <div id="root-good">
        <keep-alive>
            <h1>{{ good.title }}</h1>
            <div>{{ good.description }}</div>
            <div>{{ good.price }} P</div>
        </keep-alive>
        <Payment/>
    </div>  
</template>

<script>
//import { YooCheckout } from '@a2seven/yoo-checkout';
import Payment from '../components/Payment'

export default {
    data() {
        return {
            good: this.$route.params.item
        }
    },
    components: {
        Payment
    },
    async mounted() { 

        /* in future... */

    }
}
</script>

<style lang="less" scoped>

</style>