<template>
    <div>
        <div class="total-number">错题总数： {{total_num}}</div>

        <Tabs value="name1" @on-click="handleSelectTab">
            <TabPane label="按用户查看" name="name1" >
                <div style="margin-top: 20px;"></div>
                <Row>
                    <i-col span="10">
                        <ve-pie :data="chartDataUserType"></ve-pie>
                    </i-col>
                    <i-col offset="2" span="10">
                        <ve-bar :data="chartDataUserItem"></ve-bar>
                    </i-col>
                </Row>
                <!--<Table stripe :columns="style_user" :data="data_user"></Table>-->
            </TabPane>
            <TabPane label="按错题查看" name="name2">
                <div style="margin-top: 20px;"></div>
                <Row>
                    <i-col span="16" offset="4">
                        <ve-line :data="chartDataItemTime"></ve-line>
                    </i-col>
                </Row>

                <!--<Table stripe :columns="style_question" :data="data_question"></Table>-->
            </TabPane>
            <TabPane label="按标签查看" name="name3">
                <div style="margin-top: 20px;"></div>
                <Row>
                    <i-col span="16" offset="4">
                        <ve-bar :data="chartDataItemTag"></ve-bar>
                    </i-col>
                </Row>

            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import ICol from "iview/src/components/grid/col";

    import UserData from '../../../../../assets/statistics-user.json';
    import QuestionData from '../../../../../assets/statistics-question.json';
    import TagData from '../../../../../assets/statistics-tag.json';
    import TagQuestionData from '../../../../../assets/statistics-tag-question.json';

    export default {
        components: {ICol},
        name: "statistics",

        data() {
            return {
                total_num: 0,

                chartDataUserType: {
                    columns: ['userType', 'itemNum'],
                    rows: [
                        { 'userType': '管理员', 'itemNum': 0 },
                        { 'userType': '普通用户', 'itemNum': 0 },

                    ]
                },
                chartDataUserItem: {
                    columns: ['用户名', '错题数'],
                    rows: []
                },

                chartDataItemTime: {
                    columns: ['时间', '新增错题数'],
                    rows: []
                },

                chartDataItemTag: {
                    columns: ['标签', '错题数'],
                    rows: []
                },

                style_question: [
                    {
                        title: '标题',
                        key: 'title',
                        sortable: true
                    },
                    {
                        title: '标签',
                        key: 'tags',
                    },
                    {
                        title: '查看次数',
                        key: 'viewCount',
                        sortable: true
                    },
                    {
                        title: '重做次数',
                        key: 'redoCount',
                        sortable: true
                    }
                ],
                data_question: [],

                style_tag: [
                    {
                        title: '标签',
                        key: 'tag',
                        sortable: true
                    },
                    {
                        title: '错题数目',
                        key: 'num',
                        sortable: true
                    }
                ],
                data_tag: TagData,

                style_list: [
                    {
                        title: '标题',
                        key: 'title',
                        sortable: true
                    },
                    {
                        title: '标签',
                        key: 'tags',
                        // filters: [
                        //     {
                        //         label: '管理员',
                        //         value: 1
                        //     },
                        //     {
                        //         label: '普通用户',
                        //         value: 2
                        //     }
                        // ],
                        // filterMultiple: false,
                        // filterMethod (value, row) {
                        //     if (value === 1) {
                        //         return row.group === '管理员';
                        //     } else if (value === 2) {
                        //         return row.group === '普通用户';
                        //     }
                        // }
                    },
                    {
                        title: '来源',
                        key: 'source',
                        "sortable": true,
                        filters: [
                            {
                                label: '管理员',
                                value: 1
                            },
                            {
                                label: '普通用户',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            if (value === 1) {
                                return row.source === '管理员';
                            } else if (value === 2) {
                                return row.source === '普通用户';
                            }
                        }
                    },
                    {
                        title: '重做次数',
                        key: 'redoCount',
                        sortable: true
                    }
                ],
                data_list: TagQuestionData,

            }
        },

        mounted: function () {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/statistics/item/num", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = () => {
                console.log(xhr.readyState + "  " + xhr.status);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    let infoResponse = JSON.parse(xhr.responseText);
                    console.log(infoResponse);
                    console.log(infoResponse.status);
                    if (infoResponse.status) {
                        this.total_num = infoResponse.num;
                    }
                }
            };
            xhr.send();

            this.getUserInfo();
        },

        methods: {
            handleSelectTab: function(name) {
                console.log("> name: " + name);
                if (name === 'name1') {
                    this.getUserInfo();
                } else if (name === 'name2') {
                    this.getItemInfo();
                } else if (name === 'name3') {
                    this.getTagInfo();
                }
            },

            getUserInfo: function () {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/statistics/item", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let infoResponse = JSON.parse(xhr.responseText);
                        console.log(infoResponse);
                        console.log(infoResponse.status);
                        if (infoResponse.status) {
                            this.chartDataUserType.rows[0]['itemNum'] = infoResponse.adminItemNum;
                            this.chartDataUserType.rows[1]['itemNum'] = infoResponse.normalItemNum;

                            let infoObj = infoResponse.userItemInfo;
                            let obj_num = infoObj.length;
                            this.chartDataUserItem.rows = [];
                            for (let i = 0; i < obj_num; i++) {
                                this.chartDataUserItem.rows.push({
                                    '用户名': infoObj[i].username,
                                    '错题数': infoObj[i].num
                                });
                            }
                        }
                    }
                };
                xhr.send();
            },

            getItemInfo: function () {
                console.log("> enter getItemInfo");
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/statistics/item/time", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let infoResponse = JSON.parse(xhr.responseText);
                        console.log(infoResponse);
                        console.log(infoResponse.status);
                        if (infoResponse.status) {
                            this.chartDataItemTime.rows = [];
                            this.chartDataItemTime.rows.push({
                                '时间': '5个月前',
                                '新增错题数': infoResponse.n5
                            });
                            this.chartDataItemTime.rows.push({
                                '时间': '4个月前',
                                '新增错题数': infoResponse.n4
                            });
                            this.chartDataItemTime.rows.push({
                                '时间': '3个月前',
                                '新增错题数': infoResponse.n3
                            });
                            this.chartDataItemTime.rows.push({
                                '时间': '2个月前',
                                '新增错题数': infoResponse.n2
                            });
                            this.chartDataItemTime.rows.push({
                                '时间': '1个月前',
                                '新增错题数': infoResponse.n1
                            });
                            this.chartDataItemTime.rows.push({
                                '时间': '本月',
                                '新增错题数': infoResponse.n0
                            });
                        }
                    }
                };
                xhr.send();
            },

            getTagInfo: function () {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/statistics/item/tag", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let infoResponse = JSON.parse(xhr.responseText);
                        console.log(infoResponse);
                        console.log(infoResponse.status);
                        if (infoResponse.status) {
                            let infoObj = infoResponse.itemTagInfo;
                            let obj_num = infoObj.length;
                            this.chartDataItemTag.rows = [];
                            for (let i = 0; i < obj_num; i++) {
                                this.chartDataItemTag.rows.push({
                                    '标签': infoObj[i].name,
                                    '错题数': infoObj[i].num
                                });
                            }
                        }
                    }
                };
                xhr.send();
            }

        },
    }
</script>

<style scoped>

    .total-number {
        padding: 0 18px 10px;

        font-size: 14px;
    }

    .tag-page {
        padding: 0 10px;
    }

</style>
