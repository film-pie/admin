<script>
import {DropdownItem, MenuGroup, MenuItem, Space} from "view-ui-plus";
import {transferIndex} from "view-ui-plus/src/utils/transfer-queue";
import axios from "axios";
import appConfig from '../../../public/config/config'

export default {
    components: {DropdownItem, Space, MenuGroup, MenuItem},
    data() {
        return {
            isCollapsed: false,
            visible: false,
            pwd: '',
            apiUrl: appConfig.app.api,

            username: '',
            columns: [
                {
                    title: 'UID',
                    key: 'uid'
                }, {
                    title: '姓名',
                    key: 'uname'
                },
                {
                    title: '头像URL',
                    key: 'pic'
                },
                {
                    title: '描述',
                    key: 'info'
                }
            ],
            data: [
                {
                    "uname": "",
                    "pic": "",
                    "info": ""
                }
            ],
            formData: {
                uid: 0,
                uname: '',
                pic: '',
                info: ''
            },
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            update: false,
            modal_delete: false,
            modal_update: false,
            modal_add: false,
            model_loading: true,
            modal_exitLogin: false
        };

    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    created() {
        this.pwd = this.$cookies.get('pwd');
        this.$cookies.remove("username")
        axios.get(this.apiUrl + '/getUserList', {
            params: {
                pwd: this.pwd
            }
        }).then(response => {
            if ((response.data.status === 200)) {
                this.data = response.data.data
            }
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        handleContextMenu(row) {
            this.contextLine = this.data.findIndex(item => item.uname === row.uname);

        },
        transferIndex() {
            return transferIndex
        },
        handleOpen() {
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
        },
        exitLogin() {
            this.modal_exitLogin = true
        },
        add() {
            this.update = false
            this.formData = {
                uid: this.returnNumber(this.data[this.data.length - 1].uid) + 1,
                uname: '',
                pic: '',
                info: ''
            }
            this.value = true
        },
        updateUserList() {
            axios.get(this.apiUrl + '/editUserList', {
                params: {
                    pwd: this.pwd,
                    data: this.data
                }
            }).then(response => {
                if ((response.data.status === 200)) {
                    this.$Message["success"]({
                        background: true,
                        content: '成功'
                    });
                } else {
                    this.$Message['error']({
                        background: true,
                        content: '失败'
                    });
                }

            }).catch(error => {
                console.log(error);
                this.$Message['error']({
                    background: true,
                    content: '发生错误'
                });
            });
        },
        modal_delete_ok() {
            setTimeout(() => {
                this.$router.push({path: this.$route.path, query: {t: Date.now()}})
            }, 500);
            this.data.splice(this.contextLine, 1);
            this.updateUserList()
        },
        modal_add_ok() {
            setTimeout(() => {
                this.$router.push({path: this.$route.path, query: {t: Date.now()}})
            }, 500);
            this.data.push(this.formData)
            this.updateUserList()
        },
        modal_update_ok() {
            setTimeout(() => {
                this.$router.push({path: this.$route.path, query: {t: Date.now()}})
            }, 500);
            this.data[this.contextLine] = this.formData
            this.updateUserList()
        },
        modal_exitLogin_ok() {
            this.$Message.warning('退出登录！')
            this.$cookies.remove("pwd")
            this.$cookies.remove("username")
            this.$router.push('/login')
        },
        addSubmit() {
            if (!this.update) {
                this.modal_add = true
            } else {
                this.modal_update = true
            }
        },
        updateUser() {
            this.update = true
            this.formData = this.data[this.contextLine]
            this.value = true
        },
        returnNumber(num) {
            if ((typeof num) === Number) {
                return num
            } else {
                return Number(num)
            }
        }
    }
}
</script>

<template>
    <div style="height: 64px;">
        <Header :style="{position: 'fixed', width: '100%',background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
                style="z-index: 998;line-height: 64px;overflow: visible">
            <Breadcrumb :style="{margin: '16px 0,'}">
                <BreadcrumbItem>主页</BreadcrumbItem>
                <BreadcrumbItem>管理界面</BreadcrumbItem>
                <BreadcrumbItem>用户管理</BreadcrumbItem>
            </Breadcrumb>
            <div style="position: fixed;top: 0;right: 50px;z-index:999">
                <Dropdown>
                    <a href="javascript:void(0)" style="color: black">
                        <Space size="large" wrap>
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                        </Space>
                        <Icon type="ios-arrow-down"></Icon>
                    </a>

                    <template #list>
                        <DropdownMenu>
                            <DropdownItem @click="exitLogin">退出登录</DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
        </Header>
    </div>
    <div style="height: 100px;background-color: white;padding-left: 20px;margin-bottom: 10px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);">
        <br>
        <h1>用户列表</h1>
        <p>请使用右键菜单对列表进行操作</p>
    </div>
    <Content :style="{padding: '0 16px 16px'}">
        <Button style="margin-bottom: 10px; width: 80px; margin-left: 20px" type="primary" @click="add">添加</Button>
        <Drawer
            v-model="value"
            :mask-closable="false"
            :styles="styles"
            title="编辑"
            width="360"
        >
            <Form :model="formData">
                <FormItem label="姓名" label-position="top">
                    <Input v-model="formData.uname" placeholder="please enter uname"/>
                </FormItem>
                <FormItem label="头像Url" label-position="top">
                    <Input v-model="formData.pic" placeholder="please enter url">
                    </Input>
                </FormItem>
                <FormItem label="描述" label-position="top">
                    <Input v-model="formData.info" :rows="4" placeholder="please enter the info"
                           type="textarea"/>
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value = false">Cancel</Button>
                <Button type="primary" @click="addSubmit">Submit</Button>
            </div>
        </Drawer>
        <Table
            :columns="columns"
            :data="data"
            border
            context-menu
            show-context-menu
            @on-contextmenu="handleContextMenu"
        >
            <template #contextMenu>
                <DropdownItem @click="updateUser">编辑</DropdownItem>
                <DropdownItem style="color: #ed4014" @click="modal_delete=true">删除</DropdownItem>
            </template>
        </Table>
        <Modal
            v-model="modal_delete"
            :loading="model_loading"
            title="提示"
            @on-ok="modal_delete_ok">
            <p>确定删除？</p>
        </Modal>
        <Modal
            v-model="modal_add"
            :loading="model_loading"
            title="提示"
            @on-ok="modal_add_ok">
            <p>确定添加？</p>
        </Modal>
        <Modal
            v-model="modal_update"
            :loading="model_loading"
            title="提示"
            @on-ok="modal_update_ok">
            <p>确定更新？</p>
        </Modal>
        <Modal
            v-model="modal_exitLogin"
            :loading=false
            title="提示"
            @on-ok="modal_exitLogin_ok">
            <p>确定退出登录？</p>
        </Modal>
    </Content>
</template>

<style lang="less">
.gridtable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
}

.demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>