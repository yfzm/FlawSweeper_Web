<template>
    <div>
        <Row type="flex" align="middle">
            <i-col span="4">
                <Button type="text" @click="back">返回上一页</Button>
            </i-col>
            <i-col span="20">
                <span class="topic-num">题目 &nbsp;&nbsp; {{ topic_data.title }}</span>

            </i-col>

        </Row>

        <div :style="{paddingTop: '20px'}"></div>

        <Row>
            <i-col span="14">
                <Card>
                    <div>
                        <div v-html="topic_data.qText">
                        </div>
                    </div>
                </Card>
                <div :style="{paddingTop: '10px'}"></div>
                <div class="padding-txt">
                    答案： {{topic_data.cAnswer}}
                </div>
            </i-col>
            <i-col span="6" offset="2">
                <Card>
                    <div class="card_title">
                        信息统计
                    </div>
                    <div class="card_content">
                        <p>创建日期：{{ parse_time(topic_data.createTime) }}</p>
                        <p>浏览次数：{{ topic_data.viewCount }}</p>
                        <p>重做次数：{{ topic_data.redoCount }}</p>
                        <p>编辑次数：{{ topic_data.editCount }}</p>
                    </div>

                </Card>
            </i-col>
        </Row>


    </div>
</template>

<script>

    // import QuestionData from '../../../../../../../assets/data-detail.json'

    export default {
        name: "view",

        data: () => ({
            topic_data: {},
            item_id: ""
        }),

        mounted: function () {
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
                        this.topic_data = detailResponse;
                    }
                }
            };
            xhr.send();
        },

        methods: {
            back: function () {
                this.$router.go(-1);
            },

            edit: function () {
                this.$router.push({name:'question_manage_edit', query:{id: this.topic_data.id}})
            },

            parse_time: function (sec) {
                if (typeof sec === 'number') {
                    let date = new Date(sec);
                    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                } else {
                    return sec;
                }
            }
        }
    }


</script>

<style scoped>

    .topic-num {
        color: #bbbec4;
        font-size: 22px;

        padding-bottom: 10px;
    }

    .card_title {
        padding-bottom: 8px;
        border-bottom: 1px dashed #dddee1;

        color: #80848f;
    }

    .card_content {
        padding-top: 10px;

    }

    .padding-txt {
        padding: 10px;
    }
</style>
