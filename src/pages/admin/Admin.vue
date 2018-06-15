<template>
    <div class="admin">
        <div v-if="$route.path === '/admin/login'" class="bg">
            <!--<img src="./assets/bg.jpg">-->
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "admin"
    }
</script>

<style scoped>

    .admin {
        height: 100%;
    }

</style>
