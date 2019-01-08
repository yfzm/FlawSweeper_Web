<template>

    <div>

        <Layout>
            <Header v-if="$route.path !== '/admin' && $route.path !== '/admin/login'" class="app_nav_header">
                <my-header></my-header>
            </Header>

            <Content class="body_page">
                <Row type="flex" justify="center">
                    <i-col span="12">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <FormItem label="用户名" prop="username">
                                <i-input v-model="formValidate.username" placeholder="请输入用户名"></i-input>
                            </FormItem>
                            <FormItem label="E-mail" prop="mail">
                                <i-input v-model="formValidate.mail" placeholder="请输入邮箱"></i-input>
                            </FormItem>
                            <FormItem label="手机" prop="phone">
                                <i-input v-model="formValidate.phone" placeholder="请输入手机号码"></i-input>
                            </FormItem>

                            <FormItem label="密码" prop="password">
                                <i-input type="password" v-model="formValidate.password" placeholder="请输入密码(8~16位，同时包含字母和数字)"></i-input>
                            </FormItem>

                            <FormItem label="重复密码" prop="password2">
                                <i-input type="password" v-model="formValidate.password2" placeholder="请再次输入密码"></i-input>
                            </FormItem>

                            <FormItem>
                                <Row>
                                    <i-col span="14" offset="3">
                                        <Button type="primary" long @click="handleSubmit('formValidate')">注册</Button>
                                    </i-col>

                                </Row>
                            </FormItem>
                        </Form>

                    </i-col>
                </Row>
            </Content>

            <Footer>
                <my-footer></my-footer>
            </Footer>
        </Layout>


    </div>


</template>

<script>
    import myHeader from '../../components/HeaderTitle'
    import myFooter from '../../components/Footer'
    import ICol from "iview/src/components/grid/col";

    export default {
        components: {
            myHeader,
            myFooter,
            ICol
        },
        name: "register",

        data() {

            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请设置密码'));
                } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)) {
                    callback(new Error('密码应为8~16位，且必须同时包含字母和数字'))
                } else {
                    if (this.formValidate.password2 !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('password2');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('重复密码不能为空'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号码不能为空'));
                } else if (!/^\d{11}$/.test(value)) {
                    callback(new Error('手机号码应为11位，且仅包含数字'));
                } else {
                    callback();
                }
            };


            return {
                formValidate: {
                    username: '',
                    mail: '',
                    phone: '',
                    password: '',
                    password2: ''
                },


                ruleValidate: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号码不能为空', trigger: 'blur'},
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur' }
                    ],
                    password2: [
                        {required: true, message: '重复密码不能为空', trigger: 'blur'},
                        {validator: validatePassCheck, trigger: 'blur' }
                    ],

                }
            }
        },

        methods: {
            handleSubmit: function (formData) {
                this.$refs[formData].validate((valid) => {
                    if (valid) {
                        let register_form = {
                            username: this.formValidate.username,
                            password: this.formValidate.password,
                            email: this.formValidate.mail,
                            phone: this.formValidate.phone,
                            type: 0
                        };
                        console.log("from formData: " + formData.username);
                        console.log("from html: " + this.formValidate.username);
                        let data = JSON.stringify(register_form);
                        console.log(data);

                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", "http://212.129.145.211:30001/auth/register", true);
                        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                        xhr.onreadystatechange = () => {
                            console.log(xhr.readyState + "  " + xhr.status);
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                console.log(xhr.responseText);
                                let registerResponse = JSON.parse(xhr.responseText);
                                console.log(registerResponse);
                                console.log(registerResponse.status);
                                if (registerResponse.status) {
                                    this.$Message.success('注册成功!');
                                    this.$router.push("notepad");
                                } else {
                                    this.$Message.warning('注册失败,可能是用户名被占用，请重新注册');
                                }
                            }
                        };
                        xhr.send("json=" + data);
                    } else {
                        this.$Message.error('表单填写不完整');
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .register-title {
        color: #80848f;
        font-size: 20px;
        text-align: center;
        padding: 10px 0 20px;
    }

    .register-form {
        padding-top: 100px;
    }

</style>
