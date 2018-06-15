<template>
    <div>
        <div class="total-number">错题总数： 974</div>

        <Tabs value="name1">
            <TabPane label="按用户查看" name="name1">
                <Table stripe :columns="style_user" :data="data_user"></Table>
            </TabPane>
            <TabPane label="按错题查看" name="name2">
                <Table stripe :columns="style_question" :data="data_question"></Table>
            </TabPane>
            <TabPane label="按标签查看" name="name3">
                <div class="tag-page">
                    <Row>
                        <i-col span="5">
                            <i-input placeholder="输入标签检索">
                                <Button slot="append" icon="ios-search"></Button>
                            </i-input>

                            <div :style="{paddingBottom: '10px'}"></div>

                            <Table :columns="style_tag" :data="data_tag"></Table>

                            <div :style="{paddingBottom: '10px'}"></div>

                            <Button long>加载更多</Button>

                        </i-col>

                        <i-col span="17" offset="2">
                            <Table :columns="style_list" :data="data_list"></Table>
                        </i-col>
                    </Row>
                </div>

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

        data () {
            return {
                style_user: [
                    {
                        title: '用户名',
                        key: 'username',
                        sortable: true
                    },
                    {
                        title: '用户类别',
                        key: 'group',
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
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.group === '管理员';
                            } else if (value === 2) {
                                return row.group === '普通用户';
                            }
                        }
                    },
                    {
                        title: '错题总数',
                        key: 'num',
                        sortable: true
                    }
                ],
                data_user: UserData,

                style_question: [
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
                        filterMethod (value, row) {
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
                data_question: QuestionData,

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
                        filterMethod (value, row) {
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
        }
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
