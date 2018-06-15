<template>
    <div class="nav_header">
        <!--<span style="color: #fff;">This is header.</span>-->
        <!--<Button type="text">登录</Button>-->
        <div class="nav_wrapper">
            <Row>
                <i-col span="4">
                    <span class="title">我的错题本</span>
                </i-col>

                <i-col span="16">
                    <Row type="flex" justify="center">
                        <span class="page-title">用户注册</span>
                    </Row>
                </i-col>

                <i-col span="4">
                    <Row type="flex" justify="end">
                        <router-link to="login">
                            <Button type="success">已有账号？立即登录</Button>
                        </router-link>
                    </Row>

                </i-col>
            </Row>

        </div>

    </div>
</template>

<script>

    export default {
        name: "header",

        data: () => ({
            value: ""
        }),

        methods: {
            search: function () {
                if (this.value !== "") {
                    this.$router.push({name: 'Notepad', query: {word: this.value}});
                }
            }
        },


    }
</script>

<style scoped>

    .nav_header {
        color: #fff;
        margin: 0 auto;
        max-width: 1000px;
        min-width: 1000px;
    }

    .nav_wrapper {
        margin: 0 10px;
    }

    .nav_button_text a {
        color: aliceblue;
    }

    .nav_button_text a:hover {
        color: #2d8cf0;
    }

    .title {
        font-size: 20px;
        padding-right: 50px;
    }

    .page-title {
        font-size: 22px;
    }


</style>
