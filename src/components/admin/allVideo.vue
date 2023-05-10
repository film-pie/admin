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
            username: '',
            selectedRow: 0,
            apiUrl: appConfig.app.api,
            ellipsis: true,
            loading: true,
            modal: false,
            u_columns: [
                {
                    title: 'uid',
                    key: 'uid'
                },
                {
                    title: 'works',
                    key: 'works'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    align: 'center'
                }
            ],
            u_table: '',
            u_data: [],
            columns: [
                {
                    title: '标题',
                    key: 'title',
                },
                {
                    title: '描述',
                    key: 'info',

                },
                {
                    title: '视频URL',
                    key: 'src'
                },
                {
                    title: '封面URL',
                    key: 'img'
                },
            ],
            data: [
                {
                    "title": "",
                    "info": "",
                    "src": "",
                    "img": '',
                    "user": []
                }
            ],
            userdata: [
                {
                    "uid": 0,
                    "uname": "",
                    "pic": "",
                    "info": ""
                }
            ],
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                title: '',
                info: '',
                src: '',
                img: '',
                user: []
            },
            cityList: [
                {
                    value: 1,
                    label: 'New York'
                },
                {
                    value: 2,
                    label: 'London'
                },
                {
                    value: 3,
                    label: 'Sydney'
                },
                {
                    value: 4,
                    label: 'Ottawa'
                },
                {
                    value: 5,
                    label: 'Paris'
                },
                {
                    value: 6,
                    label: 'Canberra'
                }
            ],
            uid: 0,
            works: ''
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
        this.username = this.$cookies.get('username');
        axios.get(this.apiUrl + '/getVideo', {
            params: {
                pwd: this.pwd
            }
        }).then(response => {
            if ((response.data.status === 200)) {
                this.data = response.data.data
                // JSON.parse()
                this.loading = false;
            }
        }).catch(error => {
            console.log(error.message);
        });


        axios.get(this.apiUrl + '/getUserList', {
            params: {
                pwd: this.pwd
            }
        }).then(response => {
            if ((response.data.status === 200)) {
                this.userdata = response.data.data

            }
        }).catch(error => {
            console.log(error);
        });
    },

    methods: {
        handleContextMenu(row) {
            this.contextLine = this.data.findIndex(item => item.title === row.title);
        },
        handleContextMenuEdit() {
            this.$Message.info('Click edit of line' + this.contextLine);
        },

        show() {
            this.u_data = []
            this.data[this.contextLine].user.forEach(videoUser => {
                console.log(videoUser.uid)
                console.log(this.data)
                // console.log(this.userdata)
                const user = this.userdata.find(u => u.uid === videoUser.uid)
                this.u_data.push({"works": videoUser.works, "name": user.uname, "info": user.info})
            })
            this.u_table = ''
            this.u_data.forEach(element => {
                this.u_table += '<tr><td>' + element.works + '</td><td>' + element.name + '</td><td>' + element.info + '</td></tr>';
            })
            this.$Modal.info({
                title: 'User Info',
                content: '<table class="gridtable"><tr><th>职位</th><th>姓名</th><th>描述</th></tr>' + this.u_table + '</table>'
            })
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

        },
        styles() {
            if (this.ellipsis) {
                return {
                    width: '100px'
                }
            } else {
                return {}
            }
        },
        addSubmit() {
            axios.get(this.apiUrl + '/addVideo', {
                params: {
                    pwd: this.pwd,
                    title: this.formData.title,
                    info: this.formData.info,
                    src: this.formData.src,
                    img: this.formData.img,
                    user: this.formData.user
                }
            }).then(response => {
                console.log(response.data.status)
                if ((response.data.status === 200)) {
                    console.log(response.data.msg)
                } else {
                    console.log('上传失败')
                }

            }).catch(error => {
                console.log(error);
            });
            // this.$router.go(0)
            this.$router.push({path: this.$route.path, query: {t: Date.now()}})
        },
        add() {
            this.cityList = []
            this.userdata.forEach(element => {
                this.cityList.push({"value": element.uid, "label": element.uname})
            })
            this.value = true
        },
        addUser() {
            // console.log(this.uid+"\t"+this.works)
            this.formData.user.push({"uid": this.uid, "works": this.works})
        },
        remove(index) {
            this.formData.user.splice(index, 1);
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
                <BreadcrumbItem>视频管理</BreadcrumbItem>
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
        <h1>视频列表</h1>
        <p>请使用右键菜单对列表进行操作</p>
    </div>
    <Content :style="{padding: '0 16px 16px'}">
        <Button style="margin-bottom: 10px; width: 80px; margin-left: 20px" type="primary" @click="add">添加
        </Button>
        <Drawer
                v-model="value"
                :mask-closable="false"
                :styles="styles"
                title="Create"
                width="730"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="标题" label-position="top">
                            <Input v-model="formData.title" placeholder="please enter "/>
                        </FormItem>
                        <FormItem label="视频Url" label-position="top">
                            <Input v-model="formData.src" placeholder="please enter url">
                            </Input>
                        </FormItem>
                        <FormItem label="封面Url" label-position="top">
                            <Input v-model="formData.img" placeholder="please enter url">
                            </Input>
                        </FormItem>
                        <FormItem label="描述" label-position="top">
                            <Input v-model="formData.info" :rows="4" placeholder="please enter the info"
                                   type="textarea"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="选择角色" label-position="top">
                            <Select v-model="uid">
                                <Option v-for="item in cityList" :key="item.value" :value="item.value">{{
                                    item.label
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="职位" label-position="top">
                            <Input v-model="works" placeholder="please enter works">
                            </Input>
                        </FormItem>
                        <Button style="margin-bottom: 10px; width: 80px; margin-left: 20px" type="primary"
                                @click="addUser">添加
                        </Button>
                        <FormItem label="" label-position="top">
                            <Table :columns="u_columns" :data="formData.user" height="200">
                                <template #action="{ row, index }">
                                    <Button size="small" type="error" @click="remove(index)">Delete</Button>
                                </template>
                            </Table>
                        </FormItem>
                    </Col>
                </Row>
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
                <DropdownItem @click="show">参演列表</DropdownItem>
                <DropdownItem @click="">编辑</DropdownItem>
                <DropdownItem style="color: #ed4014" @click="">删除</DropdownItem>
            </template>
        </Table>
    </Content>
</template>

<style lang="css">


.gridtable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
}

.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
    width: 90px;
}

.gridtable td {
    width: 90px;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
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