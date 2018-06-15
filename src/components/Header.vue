<template>
    <div class="nav_header">
        <!--<span style="color: #fff;">This is header.</span>-->
        <!--<Button type="text">登录</Button>-->
        <div class="nav_wrapper">
            <Row>
                <i-col span="4">
                    <span class="title">我的错题本</span>
                </i-col>

                <i-col span="17">
                    <Input v-model="value" size="large" placeholder="输入标签开始检索" class="input-search-box"/>
                    <Button size="large" type="primary" icon="ios-search" shape="circle" @click="search">搜索</Button>
                </i-col>

                <i-col span="3">
                    <Row type="flex" justify="end">
                        <router-link v-if="$route.path === '/login'" to="register">
                            <Button type="default">快速注册</Button>
                        </router-link>

                        <router-link v-else-if="$route.path === '/register'" to="login">
                            <Button type="success">已有账号？立即登录</Button>
                        </router-link>

                        <Poptip v-else trigger="hover" placement="bottom" :transfer=true>
                            <div class="poptip-div">
                                <img v-if="profilePhoto!==null" :src="encodeImg" height="30px" width="30px"/>
                                <span class="nav_button_text">{{username}}</span>
                            </div>
                            <div slot="content" class="pop-menu">
                                <div class="wrapper">
                                    <router-link to="notepad">
                                        <Button type="text" icon="android-person">主页</Button>
                                    </router-link>
                                </div>
                                <div class="wrapper">
                                    <router-link to="profile">
                                        <Button type="text" icon="android-settings">设置</Button>
                                    </router-link>
                                </div>
                                <div class="wrapper">
                                    <Button type="text" icon="power" @click="logout">退出</Button>
                                </div>
                            </div>
                        </Poptip>


                    </Row>

                </i-col>
            </Row>

        </div>

    </div>
</template>

<script>

    export default {
        name: "header",

        props: ['word'],

        data: () => ({
            value: "",
            username: "",
            profilePhoto: ""
        }),

        mounted: function () {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/userProfile", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = () => {
                console.log(xhr.readyState + "  " + xhr.status);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    let response = JSON.parse(xhr.responseText);
                    console.log(response);
                    console.log(response.status);
                    if (response.status) {
                        this.username = response.username;
                        this.profilePhoto = response.profilePhoto;
                    } else {
                        this.$Message.error("拉取个人信息失败！");
                        this.username = "用户";
                        this.profilePhoto = null;
                    }
                }
            };
            xhr.send();
        },

        methods: {
            search: function () {
                if (this.value !== "") {
                    // this.$router.push({path: 'Notepad', query: {word: this.value}});
                    console.log("emit changeWord");
                    this.$emit("changeWord", this.value);

                }
            },

            logout: function () {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/logoutNow", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let loginResponse = JSON.parse(xhr.responseText);
                        console.log(loginResponse);
                        console.log(loginResponse.status);
                        if (loginResponse.status) {
                            this.$Message.success('登出成功');
                            this.$router.push("login");
                        } else {
                            this.$Message.error('发生未知错误，无法退出');
                        }
                    }
                };
                xhr.send();

            },


        },

        computed: {
            encodeImg: function () {
                return "data:image/png;base64," + this.profilePhoto;
            }
        },

        watch: {
            word(curVal, oldVal) {
                if (curVal) {
                    console.log("> Header: value_changed_to: " + this.word);
                    // this.$Message.success(this.searchWord);

                }
            },
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

    .nav_button_text {
        margin-left: 10px;
        font-size: 12px;
    }

    .nav_button_text a {
        color: aliceblue;
    }

    .nav_button_text a:hover {
        color: #2d8cf0;
    }

    .search-box {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 20px;
        padding-right: 50px;
    }

    .input-search-box {
        width: 500px;
        padding-right: 10px;
    }

    .pop-menu {
        text-align: center;
    }

    .poptip-div {
        text-align: center;
        cursor: pointer;
    }

    .poptip-div img {
        vertical-align: middle;
    }

    .poptip-div span {
        vertical-align: middle;
    }

</style>
