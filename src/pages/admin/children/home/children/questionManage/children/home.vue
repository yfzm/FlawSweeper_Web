<template>
    <div>
        <Row type="flex" justify="center" align="middle">
            <i-col span="4">
                <Button type="success" long @click="create_new_topic">发布新错题</Button>
            </i-col>
            <i-col span="18" offset="2">
                <p>已发布错题：{{topic_num}}</p>
            </i-col>
        </Row>

        <div :style="{paddingTop: '20px'}"></div>

        <Table border :columns="col_style" :data="col_data"></Table>
    </div>
</template>

<script>
    // import Data from "../../../../../../../assets/question-manage.json";

    export default {
        name: "home",

        mounted: function () {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/getList", true);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = () => {
                console.log(xhr.readyState + "  " + xhr.status);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                    let listResponse = JSON.parse(xhr.responseText);
                    console.log(listResponse);
                    console.log(listResponse.status);
                    if (listResponse.status) {
                        if (listResponse.num === 0) {
                            // this.$Message.info("没有更多了");
                            return;
                        }
                        let new_items = listResponse.items;
                        this.col_data.push(...new_items);
                        // [...(this.q_data)] = this.all_data;
                        // this.page += 1;
                    }
                }
            };
            xhr.send();
        },

        data() {
            return {
                col_style: [
                    {
                        title: '题目ID',
                        key: 'id',
                        sortable: true
                    },
                    {
                        title: '标题',
                        key: 'title',
                        sortable: true
                    },
                    {
                        title: '标签',
                        key: 'qTag'
                    },
                    {
                        title: '创建日期',
                        key: 'createTime',
                        sortable: true,
                        render: (h, params) => {
                            return h('div',
                                this.parse_time(params.row.createTime)
                            );
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'default'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                col_data: []
            }
        },

        methods: {
            create_new_topic() {
                this.$router.push({name: 'question_manage_edit'})
            },

            show(index) {
                this.$router.push({name: 'question_manage_view', query: {id: this.col_data[index].id}})
            },
            edit(index) {
                this.$router.push({name: 'question_manage_edit', query: {id: this.col_data[index].id}})
            },
            remove(index) {
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>确认删除？</p>',
                    onOk: () => {
                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", "/deleteItem", true);
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
                                    this.col_data.splice(index, 1);
                                } else {
                                    this.$Message.error('删除失败，请重试');

                                }
                            }
                        };
                        xhr.send("id=" + this.col_data[index].id);
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
            },

            parse_time: function (sec) {
                if (typeof sec === 'number') {
                    let date = new Date(sec);
                    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                } else {
                    return sec;
                }
            }
        },

        computed: {
            topic_num: function () {
                return this.col_data.length;
            }
        }
    }
</script>

<style scoped>

</style>
