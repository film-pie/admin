<script>

import {DropdownItem, MenuGroup, MenuItem, Space} from "view-ui-plus";
import {transferIndex} from "view-ui-plus/src/utils/transfer-queue";
import appConfig from '../../../public/config/config'

export default {
    components: {DropdownItem, Space, MenuGroup, MenuItem},
    data() {
        return {
            isCollapsed: false,
            visible: false,
            pwd: '',
            apiUrl: appConfig.app.api,

            username: ''
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

    },
    methods: {
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
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>仪表盘</BreadcrumbItem>
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
    <Content :style="{padding: '0 16px 16px'}">
        <div style="margin: 50px">
            <NumberInfo status="down" sub-title="总播放量" sub-total="" title="  ">
                <template #total>
                    <CountUp :duration="4" :end="50193"/>
                </template>
            </NumberInfo>
        </div>
        <div style="margin: 50px">
            <NumberInfo status="down" sub-title="总下载量" sub-total="" title="  ">
                <template #total>
                    <CountUp :duration="4" :end="50193"/>
                </template>
            </NumberInfo>
        </div>
    </Content>
</template>

<style scoped>

</style>