<template>
    <div>
        <Row type="flex" justify="center">
            <i-col span="16">
                <div class="edit-title">
                    <div>
                        <Row>
                            <i-col span="2">标题</i-col>
                            <i-col span="22">
                                <i-input v-model="edit_data.title" width="20"></i-input>

                            </i-col>
                        </Row>
                    </div>
                </div>

                <div class="rich-edit">
                    <editor :html-data="edit_data.qText" v-on:textChange="changeHtml"/>
                </div>

                <!--<textarea>{{ rich_text }}</textarea>-->

                <div class="wrapper-padding">

                    <Form class="form-body" ref="formValidate" :model="formValidate" :rules="ruleValidate"
                          :label-width="80">
                        <FormItem label="答案" prop="answer">
                            <i-input v-model="formValidate.answer" placeholder="请输入参考答案"></i-input>
                        </FormItem>
                        <FormItem label="标签" prop="tags">
                            <Tag v-for="item in edit_data.qTag" :key="item" :name="item" closable
                                 @on-close="handleClose">{{item}}
                            </Tag>
                            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签
                            </Button>
                        </FormItem>
                        <FormItem label="错题原因" prop="desc">
                            <i-input v-model="edit_data.reason" type="textarea"
                                     :autosize="{minRows: 2,maxRows: 5}"
                                     placeholder="填写备注"></i-input>
                        </FormItem>

                        <FormItem>
                            <Row type="flex" justify="space-between">
                                <i-col span="10">
                                    <Button type="primary" long @click="handleSubmit('formValidate')">提交
                                    </Button>
                                </i-col>

                                <i-col span="10">
                                    <Button type="default" long @click="cancelSubmit">返回</Button>
                                </i-col>

                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </i-col>
        </Row>

        <Modal v-model="set_tag" width="360">
            <p slot="header" style="text-align:center">
                <Icon type="plus-round"></Icon>
                <span>添加标签</span>
            </p>

            <div>
                <AutoComplete
                    v-model="edit_tag"
                    :data="tags"
                    @on-search="handleComplete"
                    placeholder="输入标签"
                >

                </AutoComplete>
            </div>

            <div slot="footer">
                <Button type="success" long @click="addTag">添加</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Editor from "./Editor";
    import Data from "../assets/data-edit.json";
    import Data_default from "../assets/data-edit-new.json"
    import Tags from "../assets/tags.json";

    export default {
        name: "edit-part",

        components: {
            Editor
        },

        data() {
            return {

                is_new: false,
                item_id: "",

                edit_data: {},
                tags: [],
                allTags: [],

                set_tag: false,
                edit_tag: "",

                formValidate: {
                    answer: '',
                    desc: ''
                },

                ruleValidate: {
                    answer: [
                        {required: true, message: '答案不能为空', trigger: 'blur'}
                    ],
                },

                rich_text: '<p>在这里输入题目</p>',

                default_data: {
                    title: "",
                    qText: "",
                    reason: "",
                    qTag: [],
                    cAnswer: ""
                }
            }
        },

        mounted: function () {
            this.fetchAllTags();

            if (typeof(this.$route.query.id) === "undefined") {
                this.is_new = true;
                this.edit_data = this.default_data;
                return;
            }

            this.item_id = this.$route.query.id;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/item/entry?id=" + this.item_id, true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = () => {
                console.log(xhr.readyState + "  " + xhr.status);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    let detailResponse = JSON.parse(xhr.responseText);
                    console.log(detailResponse);
                    console.log(detailResponse.status);
                    if (detailResponse.status) {
                        this.edit_data = detailResponse;
                        this.rich_text = this.edit_data.qText;
                        this.formValidate.answer = detailResponse.cAnswer;
                    }
                }
            };
            xhr.send();
            // this.topic_data = this.q_data[this.$route.query.id - 1]
            // console.log(this.topic_data);
            if (this.$route.query.redo) {
                this.is_show_redo = true;
            }
        },

        methods: {

            fetchAllTags: function () {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/item/tags", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let detailResponse = JSON.parse(xhr.responseText);
                        console.log(detailResponse);
                        console.log(detailResponse.tags);
                        if (detailResponse.tags) {
                            this.allTags = detailResponse.tags;
                        }
                    }
                };
                xhr.send();
            },

            handleAdd: function () {
                this.set_tag = true;
            },

            handleClose(event, name) {
                const index = this.edit_data.qTag.indexOf(name);
                this.edit_data.qTag.splice(index, 1);
            },

            changeHtml: function (strHtml) {
                this.rich_text = strHtml;
            },

            handleComplete: function (value) {
                this.tags = !value ? [] : this.allTags.filter((tag) => {
                    return tag.indexOf(value) >= 0
                });
            },

            handleSubmit: function (formData) {
                this.$refs[formData].validate((valid) => {
                    if (valid) {
                        console.log("> handleSubmit: " + this.is_new);
                        if (this.is_new) {
                            this.addItem();
                        } else {
                            this.modifyItem();
                        }
                    } else {
                        this.$Message.error('表单填写不完整');
                    }
                });
                // this.$router.push('item');
            },

            modifyItem: function () {
                console.log("> enter modifyItem");
                console.log(this.edit_data);
                console.log(this.item_id);
                let edit_form = {
                    id: this.item_id,
                    title: this.edit_data.title,
                    qText: this.rich_text,
                    createTime: (new Date()).getTime(),
                    reason: this.edit_data.reason,
                    cAnswer: this.formValidate.answer,
                    qTag: this.edit_data.qTag
                };
                console.log(edit_form);
                let data = JSON.stringify(edit_form);
                console.log(data);
                data = encodeURI(encodeURIComponent(data));
                console.log(data);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/item/entry", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let registerResponse = JSON.parse(xhr.responseText);
                        console.log(registerResponse);
                        console.log(registerResponse.status);
                        if (registerResponse.status) {
                            this.$Message.success('修改成功!');
                            this.$router.go(-1);
                        } else {
                            this.$Message.warning('修改失败，请重试');
                        }
                    }
                };
                xhr.send("json=" + data);
            },

            addItem: function () {
                let edit_form = {
                    title: this.edit_data.title,
                    qText: this.rich_text,
                    createTime: (new Date()).getTime(),
                    reason: this.edit_data.reason,
                    cAnswer: this.formValidate.answer,
                    qTag: this.edit_data.qTag
                };
                let data = JSON.stringify(edit_form);
                console.log(data);
                data = encodeURI(encodeURIComponent(data));
                console.log(data);

                let xhr = new XMLHttpRequest();
                xhr.open("PUT", "/item/entry", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let addItemResponse = JSON.parse(xhr.responseText);
                        console.log(addItemResponse);
                        console.log(addItemResponse.status);
                        if (addItemResponse.status) {
                            this.$Message.success('添加成功!');
                            console.log(addItemResponse.id);
                            this.$router.go(-1);
                        } else {
                            this.$Message.warning('添加失败，请重试');
                        }
                    }
                };
                xhr.send("json=" + data);
            },

            cancelSubmit: function () {
                this.$router.push('item');
            },

            addTag: function () {
                this.edit_data.qTag.push(this.edit_tag);
                this.set_tag = false;
            }
        }
    }
</script>

<style scoped>
    .form-body {
        text-align: left;

        padding-top: 20px;
    }

    .edit-title {
        color: #80848f;
        font-size: 20px;
        text-align: left;
        padding: 10px 0 20px;
    }

    .wrapper-padding {
        padding: 0 50px 0 20px;
    }
</style>
