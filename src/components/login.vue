<template>
    <div style="background:#eeeeee">
        <Row justify="center" type="flex">
            <Col span="8" style="height: 150px;">
            </Col>
        </Row>
        <Row justify="center" type="flex">
            <Col span="8" style="height: 600px;">
                <layout>
                    <Content style="display: flex;justify-content: center;background: #eeeeee;">
                        <Card class="Card">
                            <br>
                            <h1 style="text-align: center;font-size: 32px;">欢迎登录</h1>
                            <br>
                            <div style="background-color: #dddddd;height: 2px;"></div>
                            <br>
                            <div class="demo-login">
                                <Login @on-submit="handleSubmit">
                                    <UserName name="username"/>
                                    <Password name="password"/>
                                    <br>
                                    <Submit/>
                                </Login>
                            </div>
                        </Card>
                    </Content>
                </layout>
            </Col>
        </Row>
    </div>
</template>
<style lang="less" scoped>
.Card {
  border-radius: 30px;
  width: 370px;
  box-shadow: 5px 5px 5px 5px #cccccc;
}

.demo-login {
  padding: 5%;
  width: 335px;
  margin: 0 auto !important;
}

.demo-auto-login {
  margin-bottom: 24px;
  text-align: left;
}

.demo-auto-login a {
  float: right;
}
</style>
<script>
import axios from 'axios'
import {Card, Content, Layout, Login, Password, Row, Submit, UserName} from "view-ui-plus";
import appConfig from '../../public/config/config'

export default {
    components: {Password, Submit, Login, UserName, Card, Row, Layout, Content},

    data() {

        return {
            autoLogin: true,
            apiUrl: appConfig.app.api
        }


    },
    methods: {
        handleSubmit(valid, {username, password}) {
            if (valid) {

                axios.get(this.apiUrl + '/getVideo', {
                    params: {
                        pwd: password
                    }
                })
                    .then(response => {
                        if (response.data.status === 200) {
                            this.$Message.success('登录成功！')
                            this.$cookies.set('pwd', password, '1d')
                            this.$cookies.set('username', username, '1d')
                            this.$router.push('/')
                        } else {
                            this.$Message.error('密码错误！')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        }
    },
    created() {
        if (this.$cookies.isKey('pwd')) {
            this.$router.push('/')
        }
    }
}
</script>