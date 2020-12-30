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
            @submit="handleSubmit"
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
  methods: {
    handleSubmit (e) {
      const self = this
      this.$refs.form.validate(valid => {
        if (valid) {
          userService.login(self.formModel).then(resp => {
            const body = resp.data
            const headers = resp.headers
            if (body.username) {
              self.$store.commit('SET_USER_INFO', body)
              self.$store.commit('SET_TOKEN', headers.authorization)
              shopService.getShopByUserId(body.id).then(resp => {
                if (resp.id) {
                  self.$store.commit('SET_SHOP_INFO', resp)
                  self.$router.push({name: 'home'})
                } else {
                  this.$message.warning('This account isn\'t shop owner ')
                }
              }).catch(err => {
                this.$message.error('System error')
                console.log(err)
              })
            } else {
              this.$message.warning('Username or password is incorrect')
            }
          }).catch(err => {
            this.$message.error('System error')
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
