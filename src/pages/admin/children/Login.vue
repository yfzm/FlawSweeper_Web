<template>
    <div class="body_page_no_nav">
        <Row>
            <i-col span="8" offset="16">
                <div class="card_wrapper">
                    <Card>
                        <div class="login-title">
                            <p>管理员登录</p>
                        </div>

                        <div class="login-panel">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                                <FormItem prop="user">
                                    <i-input type="text" v-model="formInline.user" placeholder="请输入用户名">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </i-input>
                                </FormItem>
                                <FormItem prop="password">
                                    <i-input type="password" v-model="formInline.password" placeholder="请输入密码">
                                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                    </i-input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
                                </FormItem>
                            </Form>

                            <Button type="text" @click="switch_to_normal">切换至普通用户登录</Button>


                        </div>
                    </Card>
                </div>

            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "adminLogin",
        data: () => ({
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                    {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
                ]
            }
        }),

        methods: {
            handleSubmit: function (formInline) {
                let data = `username=${this.formInline.user}&password=${this.formInline.password}&type=1`;

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/loginAuth", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let loginResponse = JSON.parse(xhr.responseText);
                        console.log(loginResponse);
                        console.log(loginResponse.status);
                        if (loginResponse.status) {
                            this.$router.push("home");
                        } else {
                            this.$Message.error('用户名或密码不正确');

                        }
                    }
                };
                xhr.send(data);
            },

            switch_to_normal: function () {
                this.$router.push('/login');
            }

        }
    }
</script>

<style scoped>

    .card_wrapper {
        z-index: 50;
        padding: 150px 0;
    }

    .login-title {
        color: #80848f;
        font-size: 20px;
        text-align: left;
        padding: 10px 30px 0;
    }

    .login-panel {
        padding: 20px 30px 0;
    }

</style>
