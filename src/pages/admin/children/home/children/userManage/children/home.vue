<template>
    <div>
        <Row type="flex" align="middle">
            <i-col span="4">
                <Button type="success" long @click="add_new_user">添加新用户</Button>
            </i-col>
            <i-col span="2" offset="2">
                <p>当前用户数：{{user_num}}</p>
            </i-col>
            <i-col span="16">
                <Row type="flex" justify="end">
                    <Button type="primary" @click="disable_users">禁用所选用户</Button>
                    <span :style="{paddingLeft: '10px'}"></span>
                    <Button type="primary" @click="enable_users">恢复所选用户</Button>
                    <span :style="{paddingLeft: '10px'}"></span>
                    <Button type="warning" @click="delete_users">删除所选用户</Button>
                </Row>
            </i-col>

        </Row>

        <div :style="{paddingTop: '20px'}"></div>

        <Table border ref="selection" :columns="col_style" :data="col_data"
               @on-selection-change="selection_row_changed"></Table>
    </div>
</template>

<script>
    // import UserData from '../../../../../assets/user-manage.json'

    export default {

        name: "home",

        data() {
            return {
                col_style: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户ID',
                        key: 'id',
                        sortable: true
                    },
                    {
                        title: '用户名',
                        key: 'username',
                        sortable: true
                    },
                    {
                        title: '当前状态',
                        key: 'valid',
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.valid) {
                                return h("div", "正常")
                            } else {
                                return h("div", "禁用")
                            }
                        },
                        sortable: true,
                        filters: [
                            {
                                label: '正常',
                                value: 1
                            },
                            {
                                label: '禁用',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            if (value === 1) {
                                return row.valid === true;
                            } else if (value === 2) {
                                return row.valid === false;
                            }
                        }
                    },
                    {
                        title: '错题数目',
                        key: 'num',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        sortable: true
                    },
                    {
                        title: '手机',
                        key: 'phone',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
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
                                            this.manage_items(params.index)
                                        }
                                    }
                                }, '管理用户错题'),

                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'default'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete_user(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                col_data: [],

                selection_rows: []
            }
        },

        mounted: function () {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/user/list", true);
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
                        let new_users = listResponse.users;
                        this.col_data.push(...new_users);
                        // [...(this.q_data)] = this.all_data;
                        // this.page += 1;
                    }
                }
            };
            xhr.send();
        },

        methods: {
            parse_time: function (sec) {
                if (typeof sec === 'number') {
                    let date = new Date(sec);
                    return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                } else {
                    return sec;
                }
            },

            add_new_user: function () {
                this.$router.push('/register');
            },

            delete_user: function (index) {
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>确认删除？</p>',
                    onOk: () => {
                        let id_list = [this.col_data[index].id];
                        this.delete_users_request(id_list);
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });

            },

            selection_row_changed: function (rows) {
                this.selection_rows = rows;
            },

            disable_users: function () {
                if (this.selection_rows.length === 0) {
                    this.$Message.info("您未选择任何行！");
                    return;
                }

                let id_list = [];
                for (let row of this.selection_rows) {
                    this.col_data.map((item) => {
                        if (item.id === row.id) id_list.push(row.id);
                        return item;
                    })
                }

                let disable_form = {
                    state: 0,
                    user_ids: id_list
                };
                let data = JSON.stringify(disable_form);
                console.log(data);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/user/state", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let registerResponse = JSON.parse(xhr.responseText);
                        console.log(registerResponse);
                        console.log(registerResponse.status);
                        if (registerResponse.status) {
                            this.$Message.success('禁用用户成功!');
                            for (let row of this.selection_rows) {
                                this.col_data = this.col_data.map((item) => {
                                    if (item.id === row.id) item.valid = false;
                                    return item;
                                })
                            }
                        } else {
                            this.$Message.warning('禁用失败，请重试');
                        }
                    }
                };
                xhr.send("json=" + data);

            },

            enable_users: function () {
                if (this.selection_rows.length === 0) {
                    this.$Message.info("您未选择任何行！");
                    return;
                }

                let id_list = [];
                for (let row of this.selection_rows) {
                    this.col_data.map((item) => {
                        if (item.id === row.id) id_list.push(row.id);
                        return item;
                    })
                }

                let disable_form = {
                    state: 1,
                    user_ids: id_list
                };
                let data = JSON.stringify(disable_form);
                console.log(data);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/user/state", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let registerResponse = JSON.parse(xhr.responseText);
                        console.log(registerResponse);
                        console.log(registerResponse.status);
                        if (registerResponse.status) {
                            this.$Message.success('恢复用户成功!');
                            for (let row of this.selection_rows) {
                                this.col_data = this.col_data.map((item) => {
                                    if (item.id === row.id) item.valid = true;
                                    return item;
                                })
                            }
                        } else {
                            this.$Message.warning('禁用失败，请重试');
                        }
                    }
                };
                xhr.send("json=" + data);

            },

            delete_users: function () {
                if (this.selection_rows.length === 0) {
                    this.$Message.info("您未选择任何行！");
                    return;
                }
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>确认删除？</p>',
                    onOk: () => {
                        let id_list = [];
                        for (let row of this.selection_rows) {
                            this.col_data.map((item) => {
                                if (item.id === row.id) id_list.push(row.id);
                                return item;
                            })
                        }
                        this.delete_users_request(id_list);
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });

            },

            delete_users_request: function(uids) {
                if (uids.length === 0) {
                    return;
                }

                let disable_form = {
                    user_ids: uids
                };
                let data = JSON.stringify(disable_form);
                console.log(data);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/deleteUsers", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = () => {
                    console.log(xhr.readyState + "  " + xhr.status);
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        console.log(xhr.responseText);
                        let registerResponse = JSON.parse(xhr.responseText);
                        console.log(registerResponse);
                        console.log(registerResponse.status);
                        if (registerResponse.status) {
                            this.$Message.success('删除用户成功!');
                            for (let uid of uids) {
                                this.col_data = this.col_data.filter((item) => {
                                    return item.id !== uid;
                                })
                            }
                        } else {
                            this.$Message.warning('删除失败，请重试');
                        }
                    }
                };
                xhr.send("json=" + data);

            },

            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },

            manage_items: function (index) {
                let userId = this.col_data[index].id;
                this.$router.push({name: 'user_manage_user_items', query: {id: userId}});
            }
        },

        computed: {
            user_num: function () {
                return this.col_data.length;
            }
        }
    }
</script>

<style scoped>

</style>

