<template>
    <div id="app">
        <!--<img v-if="$route.path !== '/login'" src="./assets/logo.png">-->

        <div class="layout">
            <div v-if="$route.path === '/login'" class="bg">
                <!--<img src="./assets/bg.jpg">-->
            </div>


            <router-view/>


            <!--<Layout>-->
                <!--<Header v-if="$route.path !== '/admin' && $route.path !== '/admin/login'" class="app_nav_header">-->
                    <!--<my-header> </my-header>-->
                <!--</Header>-->

                <!--<Content class="body_page">-->
                    <!--<router-view/>-->
                <!--</Content>-->

                <!--<Footer>-->
                    <!--<my-footer> </my-footer>-->
                <!--</Footer>-->
            <!--</Layout>-->
        </div>



    </div>
</template>

<script>
    import myHeader from './components/Header'
    import myFooter from './components/Footer'
    export default {
        name: 'App',

        components: {
            myHeader,
            myFooter
        },

    }
</script>

<style>

    html, body {
        height: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        height: 100%;
    }

    .layout {
        /*border: 1px solid #d7dde4;*/
        /*background: #f5f7f9;*/
        /*position: relative;*/
        /*border-radius: 4px;*/
        /*overflow: hidden;*/
        height: 100%;
    }

    .body_page {
        margin: 88px auto 0;
        max-width: 1000px;
        min-width: 1000px;

        /*text-align: center;*/

    }

    .body_page_no_nav {
        margin: 0 auto;
        max-width: 1000px;
        min-width: 1000px;
    }

    .app_nav_header {
        position: fixed;
        width: 100%;
        z-index: 99;
    }

    .bg {
        position: fixed;
        /*z-index: 20;*/
        width: 100%;
        height: 100%;
        background: #f8f8f9 url(./assets/bg.jpg) no-repeat fixed center center;
    }

</style>
