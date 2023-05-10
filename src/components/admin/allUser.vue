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
            ]
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
                const jsonArray = response.data.data
                this.data = jsonArray
            }
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        handleContextMenu(row) {
            const index = this.data.findIndex(item => item.name === row.name);
            this.contextLine = index + 1;
        },
        handleContextMenuEdit() {
            this.$Message.info('Click edit of line' + this.contextLine);
        },
        handleContextMenuDelete() {
            this.$Message.info('Click delete of line' + this.contextLine);
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
            this.$cookies.remove("pwd")
            this.$cookies.remove("username")
            this.$router.push('/login')
        },
        getUser() {

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
        <Button style="margin-bottom: 10px; width: 80px; margin-left: 20px" type="primary">添加</Button>
        <Table
                :columns="columns"
                :data="data"
                border
                context-menu
                show-context-menu
                @on-contextmenu="handleContextMenu"
        >
            <template #contextMenu>
                <DropdownItem @click="handleContextMenuEdit">编辑</DropdownItem>
                <DropdownItem style="color: #ed4014" @click="handleContextMenuDelete">删除</DropdownItem>
            </template>
        </Table>
    </Content>
</template>

<style scoped>

</style>