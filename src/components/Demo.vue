<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.dev-run-preview .dev-run-preview-edit {
    display: none
}

.log {
    width: 200px;
    height: 64px;
    font-size: 20px;
    color: #f5f7f9;
    line-height: 64px;
    text-align: center;
    font-family: 微软雅黑, serif;
}
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <div class="log">后台管理</div>
            <Menu :active-name="active_name" :open-names="open_names" accordion theme="dark" width="auto">
                <Submenu name="1">
                    <template #title>
                        <Icon type="ios-navigate"></Icon>
                        Dashboard
                    </template>
                    <MenuItem name="1-1" to="/">仪表盘</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template #title>
                        <Icon type="ios-keypad"></Icon>
                        管理界面
                    </template>
                    <MenuItem name="2-1" to="/allVideo">视频管理</MenuItem>
                    <MenuItem name="2-2" to="/allUser">用户管理</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <router-view :key="routeKey"></router-view>
        </Layout>
    </div>
</template>


<script>

import {DropdownItem, MenuGroup, MenuItem, Space} from "view-ui-plus";
import {transferIndex} from "view-ui-plus/src/utils/transfer-queue";
import axios from "axios";
import appConfig from '../../public/config/config'
import {routerKey} from "vue-router";

export default {

    components: {DropdownItem, Space, MenuGroup, MenuItem},
    data() {
        return {
            isCollapsed: false,
            visible: false,
            pwd: '',
            apiUrl: appConfig.app.api,
            active_name: "1-1",
            open_names: "['1']",
            routeKey: 0
        };

    },
    computed: {
        routerKey() {
            return routerKey
        },
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    created() {
        if (this.$route.matched.length > 1) {
            if (this.$route.path === '/allVideo') {
                this.active_name = '2-1'
                this.open_names = "['2']"
            } else if (this.$route.path === '/allUser') {
                this.active_name = '2-2'
                this.open_names = "['2']"
            }
        }
        if (!this.$cookies.isKey('pwd')) {
            this.$router.push('/login')
        } else {
            this.pwd = this.$cookies.get('pwd');
            axios.get(this.apiUrl + '/getVideo', {
                params: {
                    pwd: this.pwd
                }
            })
                .then(response => {
                    if (!(response.data.status === 200)) {
                        this.$cookies.remove("pwd")
                        this.$cookies.remove("username")
                        this.$router.push('/login')
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

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
        },


    },
    watch: {
        $route(to, from) {
            this.routeKey = Math.random();
        }
    }
}

</script>