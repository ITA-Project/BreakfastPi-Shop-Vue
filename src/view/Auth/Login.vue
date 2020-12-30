<template>
  <div class="wrapper">
    <a-row>
      <a-col :offset="9" :span="6">
        <h1>登录</h1>
        <div class="container">
          <a-form-model
            ref="form"
            :model="formModel"
            :rules="formRule"
            @submit.prevent="handleSubmit"
          >
            <a-form-model-item prop="username">
              <a-input v-model="formModel.username" placeholder="Username">
                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input v-model="formModel.password" placeholder="Password" type="password">
                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock"/>
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                html-type="submit"
                type="primary"
              >
                Log in
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import userService from '../../service/user'
import shopService from '../../service/shop'

export default {
  name: 'Login',
  data () {
    return {
      formModel: {
        username: '',
        password: ''
      },
      formRule: {
        username: [
          {required: true, message: 'Please input username', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'},
          {type: 'string', min: 6, message: 'The length of password should not smaller than 6 !', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    sessionStorage.clear()
  },
  methods: {
    handleSubmit () {
      const self = this
      this.$refs.form.validate(valid => {
        if (valid) {
          userService.login(self.formModel).then(resp => {
            const body = resp.data
            const headers = resp.headers
            if (body.username) {
              shopService.getShopByUserId(body.id).then(resp => {
                if (resp.id) {
                  sessionStorage.setItem('token', headers.authorization)
                  sessionStorage.setItem('shopId', resp.id)
                  sessionStorage.setItem('shopName', resp.name)
                  self.$router.push({name: 'home'})
                } else {
                  self.$message.warning('This account isn\'t shop owner ')
                }
              }).catch(err => {
                self.$message.error('System error')
                console.log(err)
              })
            } else {
              self.$message.warning('Username or password is incorrect')
            }
          }).catch(err => {
            self.$message.error('System error')
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.wrapper {
  margin-top: 15em;
  text-align: center;
}

.container {
  text-align: center;
}

</style>
