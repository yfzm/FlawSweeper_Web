<template>
    <div>
        <Layout>
            <Header v-if="$route.path !== '/admin' && $route.path !== '/admin/login'" class="app_nav_header">
                <my-header></my-header>
            </Header>

            <Content class="body_page">
                <p class="profile_title">完善个人信息</p>
                <div style="margin-top: 30px"></div>
                <Row>
                    <i-col span="16">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <FormItem label="简介" prop="bio">
                                <i-input v-model="formValidate.bio" placeholder="简单地介绍一下自己吧"></i-input>
                            </FormItem>
                            <FormItem label="E-mail" prop="mail">
                                <i-input v-model="formValidate.mail" placeholder="请输入邮箱"></i-input>
                            </FormItem>
                            <FormItem label="手机" prop="phone">
                                <i-input v-model="formValidate.phone" placeholder="请输入手机号码"></i-input>
                            </FormItem>
                            <FormItem label="个人主页" prop="url">
                                <i-input v-model="formValidate.url" placeholder="请输入个人主页链接"></i-input>
                            </FormItem>
                            <FormItem label="居住地" prop="location">
                                <i-input v-model="formValidate.location" placeholder="请输入现居地"></i-input>
                            </FormItem>
                            <FormItem label="学校" prop="school">
                                <i-input v-model="formValidate.school" placeholder="请输入学校"></i-input>
                            </FormItem>


                            <FormItem>
                                <Row>
                                    <i-col span="10" offset="5">
                                        <Button type="primary" long @click="handleSubmit('formValidate')">提交</Button>
                                    </i-col>

                                </Row>
                            </FormItem>
                        </Form>
                    </i-col>
                    <i-col span="6" offset="2">
                        <img v-if="profilePhoto!==null" :src="encodeImg" height="100px" width="100px"/>
                        <!--<Button long type="info" @click="changePhoto">更改头像</Button>-->
                        <!--<Upload action="//jsonplaceholder.typicode.com/posts/">-->
                        <!--<Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>-->
                        <!--</Upload>-->
                        <div style="margin-top: 15px;"></div>
                        <Upload action="/userProfile/photo"
                                :show-upload-list="false"
                                :before-upload="handleUpload"
                                :on-success="uploadFeedback"
                                :on-error="uploadErrorFeedback"
                                :on-format-error="handleFormatError"
                                :max-size="2048"
                                :on-exceeded-size="handleMaxSize"
                                accept=".png"
                                :format="['png']"
                        >

                            <Button type="info" long>更改头像</Button>
                        </Upload>
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
    import myHeader from '../../components/Header'
    import myFooter from '../../components/Footer'

    export default {
        name: "Profile",

        components: {
            myHeader,
            myFooter
        },

        data() {
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
                username: "",
                profilePhoto: "",

                formValidate: {
                    bio: '',
                    mail: '',
                    phone: '',
                    url: '',
                    location: '',
                    school: ''
                },


                ruleValidate: {
                    mail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号码不能为空', trigger: 'blur'},
                        {validator: validatePhone, trigger: 'blur'}
                    ],

                }


            }
        },

        mounted: function () {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "http://212.129.145.211:30001/userProfile", true);
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
                        this.formValidate.bio = response.bio;
                        this.formValidate.mail = response.email;
                        this.formValidate.phone = response.phone;
                        this.formValidate.url = response.url;
                        this.formValidate.location = response.location;
                        this.formValidate.school = response.school;
                    } else {
                        this.$Message.error("拉取个人信息失败！");
                        this.username = "用户";
                        this.profilePhoto = null;
                    }
                }
            };
            xhr.send();
        },

        computed: {
            encodeImg: function () {
                return "data:image/png;base64," + this.profilePhoto;
            }
        },

        methods: {
            handleSubmit: function (formData) {
                this.$refs[formData].validate((valid) => {
                    if (valid) {
                        let register_form = {
                            bio: this.formValidate.bio,
                            email: this.formValidate.mail,
                            phone: this.formValidate.phone,
                            url: this.formValidate.url,
                            location: this.formValidate.location,
                            school: this.formValidate.school
                        };
                        console.log("from html: " + this.formValidate.username);
                        let data = JSON.stringify(register_form);
                        console.log(data);

                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", "http://212.129.145.211:30001/userProfile", true);
                        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                        xhr.onreadystatechange = () => {
                            console.log(xhr.readyState + "  " + xhr.status);
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                console.log(xhr.responseText);
                                let registerResponse = JSON.parse(xhr.responseText);
                                console.log(registerResponse);
                                console.log(registerResponse.status);
                                if (registerResponse.status) {
                                    this.$Message.success('更新信息成功!');
                                    // this.$router.push("notepad");
                                } else {
                                    this.$Message.warning('更新信息失败，请重试');
                                }
                            }
                        };
                        xhr.send("json=" + data);
                    } else {
                        this.$Message.error('表单填写不完整');
                    }
                })
            },

            handleUpload: function (file) {
                console.log(file);
            },

            uploadFeedback: function (response, file, fileList) {
                this.$Message.success("上传成功");
                console.log(response);
                console.log(file);
                console.log(fileList);
                this.$router.go(0);

            },

            uploadErrorFeedback: function (error, file, fileList) {
                this.$Message.error("上传失败");
                console.log(error);
                console.log(file);
                console.log(fileList);
            },

            handleFormatError(file) {
                this.$Notice.warning({
                    title: '图片格式不正确',
                    desc: '请上传 png 格式的图片。'
                });
            },

            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '超出图片大小限制',
                    desc: '图片太大，不能超过 2M。'
                });
            },

            changePhoto: function () {

            }
        }
    }
</script>

<style scoped>
    .profile_title {
        margin-left: 15px;
        color: #80848f;
        text-align: left;
        font-size: 20px;
    }
</style>
