<template>
    <div class="item_detail">

        <Layout>
            <Header class="app_nav_header">
                <my-header></my-header>
            </Header>

            <Content class="body_page text-left">
                <div>
                    <p class="topic-num"><Button type="text" @click="$router.push('/notepad')">返回主页</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                        {{ topic_data.title }}
                        <!--&nbsp;&nbsp;&nbsp;&nbsp; <span class="topic-id">#{{ topic_data.id }}</span>-->
                    </p>

                    <Row>
                        <i-col span="16">
                            <p style="margin: 0 10px 10px;">
                                <Tag v-if="topic_data.bySelf===false" color="blue">公共</Tag>
                                <Tag v-for="tag in topic_data.qTag">
                                    {{tag}}
                                </Tag>
                            </p>
                            <Card>
                                <div>
                                    <div v-html="topic_data.qText">
                                    </div>
                                </div>
                            </Card>
                            <div class="manage-btn">
                                <Row type="flex" justify="space-around">
                                    <i-col span="4">
                                        <Button type="primary" :disabled="disable_all" long
                                                @click="trigger_show_answer">{{ txt_btn_answer }}
                                        </Button>
                                    </i-col>
                                    <i-col span="4">
                                        <Button type="info" :disabled="disable_all" long @click="edit">编辑</Button>
                                    </i-col>
                                    <i-col span="4">
                                        <Button type="success" :disabled="disable_all" long @click="show_redo">重做
                                        </Button>
                                    </i-col>
                                    <i-col span="4">
                                        <Button type="warning" :disabled="disable_all" long @click="delete_topic=true">
                                            删除
                                        </Button>
                                    </i-col>

                                </Row>

                            </div>

                            <Card v-if="is_show_answer && !is_show_redo">
                                <div class="answer-area">
                                    <p>参考答案</p>
                                    <pre>{{ topic_data.cAnswer }}</pre>
                                </div>
                            </Card>

                            <Card v-if="is_show_redo">
                                <div>
                                    <p class="redo_tip">重做这道题</p>
                                    <div class="redo_answer">
                                        <i-input v-model="redo_answer_txt" clearable size="large"
                                                 placeholder="在这里输入答案"></i-input>
                                    </div>
                                    <div class="redo_btn">
                                        <Row>
                                            <i-col span="4">
                                                <Button long type="primary" @click="submit_redo">提交</Button>
                                            </i-col>
                                            <i-col span="4" offset="2">
                                                <Button long @click="cancel_redo">取消</Button>
                                            </i-col>
                                        </Row>
                                    </div>
                                </div>
                            </Card>

                            <Modal v-model="delete_topic" width="360">
                                <p slot="header" style="color:#f60;text-align:center">
                                    <Icon type="information-circled"></Icon>
                                    <span>删除确认</span>
                                </p>
                                <div style="text-align:center">
                                    <p>你确定要永久删除这道题目吗？</p>
                                </div>
                                <div slot="footer">
                                    <Row type="flex" justify="space-around">
                                        <i-col span="11">
                                            <Button type="warning" size="large" long :loading="modal_loading"
                                                    @click="del">删除
                                            </Button>
                                        </i-col>
                                        <i-col span="11">
                                            <Button type="default" size="large" long :disabled="modal_loading"
                                                    @click="cancel_del">取消
                                            </Button>
                                        </i-col>
                                    </Row>
                                </div>
                            </Modal>


                        </i-col>

                        <i-col span="7" offset="1">
                            <Card>
                                <div class="card_title">
                                    错题原因记录
                                </div>
                                <div class="card_content">
                                    {{ (topic_data.reason === "") ? "无备注" : topic_data.reason }}
                                </div>
                            </Card>

                            <!--<div class="btn_wrapper">-->
                            <!--<Button long></Button>-->
                            <!--</div>-->

                            <div class="panel_wrapper">
                                <Collapse>
                                    <Panel name="1">
                                        查看重做历史记录
                                        <div slot="content">
                                            <div class="redo-detail-row" v-for="(item, index) in topic_data.redo">
                                                <Row>
                                                    <i-col span="4">{{index + 1}}</i-col>
                                                    <i-col span="8"><span
                                                        v-bind:style="{'color': (item.rAnswer === topic_data.cAnswer) ? '#19be6b' : '#ed3f14', 'font-size': '14px' }">{{item.rAnswer}}</span>
                                                    </i-col>
                                                    <i-col span="12">{{parse_time(item.rTime)}}</i-col>

                                                </Row>
                                            </div>

                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>

                            <div class="card_wrapper">
                                <Card>
                                    <div class="card_title">
                                        信息统计
                                    </div>
                                    <div class="card_content">
                                        <p>创建日期：{{ parse_time(topic_data.createTime) }}</p>
                                        <p>浏览次数：{{ topic_data.viewCount }}</p>
                                        <p>重做次数：{{ topic_data.redoCount }}</p>
                                        <p>编辑次数：{{ topic_data.editCount }}</p>
                                        <!--<p>熟练程度：<Rate disabled v-model="topic_data.redoLite.redoCorrectCount/topic_data.redoLite.redoCount * 5"></Rate></p>-->
                                    </div>

                                </Card>
                            </div>

                        </i-col>
                    </Row>
                </div>
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

    // import Data from "../../assets/data-detail.json";

    export default {
        name: "item",

        components: {
            myHeader,
            myFooter
        },

        data: () => ({
            item_id: "",
            redo_answer_txt: "",

            is_show_answer: false,
            is_show_redo: false,

            disable_all: false,

            delete_topic: false,
            modal_loading: false,

            xss_options: {
                whiteList: {
                    p: [],

                }
            },

            topic_data: {},

        }),

        methods: {
            trigger_show_answer: function () {
                this.is_show_answer = !this.is_show_answer;
            },

            show_redo: function () {
                this.is_show_redo = true;
                this.disable_all = true;
            },

            submit_redo: function () {
                let redo_form = {
                    id: this.item_id,
                    rAnswer: this.redo_answer_txt,
                    rTime: (new Date()).getTime(),
                };
                console.log(redo_form);
                let data = JSON.stringify(redo_form);
                console.log(data);
                data = encodeURI(encodeURIComponent(data));
                console.log(data);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/item/redo", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let redoResponse = JSON.parse(xhr.responseText);
                        console.log(redoResponse);
                        console.log(redoResponse.status);
                        if (redoResponse.status) {
                            this.$Message.success('提交成功！');
                            this.is_show_redo = false;
                            this.disable_all = false;
                            this.redo_answer_txt = "";
                            // update page
                            let redoObject = {
                                rAnswer: redo_form.rAnswer,
                                rTime: redo_form.rTime
                            };
                            this.topic_data.redo.push(redoObject);
                            // this.$router.push("notepad");
                        } else {
                            this.$Message.error('提交失败，请重试');

                        }
                    }
                };
                xhr.send("json=" + data);

            },

            cancel_redo: function () {
                this.is_show_redo = false;
                this.disable_all = false;
            },

            del() {
                if (this.topic_data.bySelf === false) {
                    this.$Message.warning("公共题目无法删除，请联系管理员");
                    this.delete_topic = false;
                    return;
                }

                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.delete_topic = false;

                    let xhr = new XMLHttpRequest();
                    xhr.open("DELETE", "/item/entry?id=" + this.item_id, true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                    xhr.onreadystatechange = () => {
                        console.log(xhr.readyState + "  " + xhr.status);
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            console.log(xhr.responseText);
                            let deleteResponse = JSON.parse(xhr.responseText);
                            console.log(deleteResponse);
                            console.log(deleteResponse.status);
                            if (deleteResponse.status) {
                                this.$Message.success('删除成功！');
                                this.$router.push("notepad");
                            } else {
                                this.$Message.error('删除失败，请重试');

                            }
                        }
                    };
                    xhr.send();
                }, 2000);
            },

            edit: function () {
                if (this.topic_data.bySelf === false) {
                    this.$Message.warning("公共题目无法编辑");
                    return;
                }
                this.$router.push({name: 'Edit', query: {id: this.$route.query.id}});
            },

            cancel_del: function () {
                this.delete_topic = false;
            },

            parse_time: function (sec) {
                if (typeof sec === 'number') {
                    let date = new Date(sec);
                    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                } else {
                    return sec;
                }
            }
        },

        mounted: function () {
            this.item_id = this.$route.query.id;

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/item/entry?id=" + this.$route.query.id, true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = () => {
                console.log(xhr.readyState + "  " + xhr.status);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    let detailResponse = JSON.parse(xhr.responseText);
                    console.log(detailResponse);
                    console.log(detailResponse.status);
                    if (detailResponse.status) {
                        this.topic_data = detailResponse;
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

        computed: {
            txt_btn_answer: function () {
                return this.is_show_answer ? "隐藏答案" : "显示答案";
            },

            xss_topic_html: function () {
                return xss(this.topic_html, this.options);
            }
        }
    }
</script>

<style scoped>

    .item_detail {
        /*text-align: left;*/
    }

    .text-left {
        text-align: left;
    }

    .topic-num {
        color: #bbbec4;
        font-size: 30px;

        padding-bottom: 10px;
    }

    .topic-id {
        font-size: 12px;
    }

    .manage-btn {
        padding: 20px 0;
    }

    .card_title {
        padding-bottom: 8px;
        border-bottom: 1px dashed #dddee1;

        color: #80848f;
    }

    .card_content {
        padding-top: 10px;

    }

    .card_wrapper {
        padding-top: 20px;
    }

    .panel_wrapper {
        padding-top: 20px;

        text-align: left;
    }

    .redo_tip {
        color: #80848f
    }

    .redo_answer {
        padding: 20px 0;
    }

    .redo_btn {
        /*padding-top: 10px;*/
        padding: 0 0 10px 20px;
    }

    .answer-area p {
        color: #80848f;
        font-size: 14px;
    }

    .redo-detail-row {
        padding-bottom: 10px;
    }

</style>
