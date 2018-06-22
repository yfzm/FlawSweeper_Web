<template>
    <div class="layout">
        <Layout class="body-layout">
            <Header>
                <Row>
                    <i-col span="8">
                        <p class="title">我的错题本 - 管理页</p>
                    </i-col>
                    <i-col span="16">
                        <Row type="flex" justify="end">
                            <p class="txt-tip">
                                欢迎登录，<span> {{username}} </span> &nbsp;&nbsp;
                                <Button @click="quit">退出登录</Button>
                                <Button @click="switch_to_normal">普通用户登录</Button>
                            </p>
                        </Row>
                    </i-col>
                </Row>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <div :style="{padding: '10px'}"></div>
                    <Menu active-name="1-1" theme="light" width="auto" @on-select="select_option">
                        <MenuItem name="1-1">
                            <Icon type="ios-gear"></Icon>
                            <span>错题管理</span>
                        </MenuItem>
                        <MenuItem name="1-2">
                            <Icon type="ios-people"></Icon>
                            <span>用户管理</span>
                        </MenuItem>
                        <MenuItem name="1-3">
                            <Icon type="stats-bars"></Icon>
                            <span>错题统计</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '15px 24px 24px'}">

                    <Content class="content">
                        <router-view/>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>

</template>

<script>
    export default {
        name: "adminHome",

        data () {
            return {
                isCollapsed: false,
                username: ""
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            // menuitemClasses () {
            //     return [
            //         'menu-item',
            //         this.isCollapsed ? 'collapsed-menu' : ''
            //     ]
            // }
        },

        mounted: function () {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/user/username", true);
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
                        // [...(this.q_data)] = this.all_data;
                        // this.page += 1;
                    }
                }
            };
            xhr.send();
        },

        methods: {
            select_option: function (sel) {
                if (sel === "1-1") {
                    this.$router.push('/admin/home/question-manage');
                } else if(sel === "1-2") {
                    this.$router.push('/admin/home/user-manage');
                } else if(sel === "1-3") {
                    this.$router.push('/admin/home/statistics');
                }
            },

            quit: function () {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/auth/logout", true);
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
                            this.$router.push('/admin/login');
                        } else {
                            this.$Message.error('发生未知错误，无法退出');
                        }
                    }
                };
                xhr.send();
            },

            switch_to_normal: function () {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/auth/logout", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let loginResponse = JSON.parse(xhr.responseText);
                        console.log(loginResponse);
                        console.log(loginResponse.status);
                        if (loginResponse.status) {
                            this.$Message.success('您已退出管理员模式');
                            this.$router.push('/login')
                        } else {
                            this.$Message.error('发生未知错误，无法退出');
                        }
                    }
                };
                xhr.send();
            }
        }
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;

        text-align: left;
        height: 100%;
    }

    .body-layout {
        height: 100%;
    }

    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .content {
        padding: 24px;
        /*minHeight: 30px;*/
        background: #fff;
    }

    .title {
        font-size: 18px;
        color: #fff;
    }

    .txt-tip {
        color: #ccc
    }

</style>
