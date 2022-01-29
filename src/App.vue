<template>
  <div id="app">

    <Menu :links=links />
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu'
export default {
  data() {
    return {
      links: [
        {
          text: 'Главная',
          href: '/',
          name: ''
        },
        {
          text: 'О нас',
          href: '/about',
          name: ''
        },
        {
          text: 'Каталог',
          href: '/shop',
          name: ''
        },
        {
          text: 'Регистрация',
          href: '/register',
          name: ''
        },
        {
          text: 'Авторизация',
          href: '/login',
          name: ''
        },
        {
          text: 'Личный кабинет',
          href: '/user',
          name: 'PersonalArea'
        },
        {
          text: 'Посты',
          href: '/posts',
          name: 'Posts'
        },
      ]
    }
  },
  components: {
    Menu
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
