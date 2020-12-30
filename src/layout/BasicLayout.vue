<template>
  <div :style="{ height: screenHeight + 'px' }">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
        <a-menu :default-selected-keys="['1']"
                :multiple="false"
                mode="inline"
                theme="dark"
        >
          <a-menu-item key="1">
            <router-link :to="{name: 'order-info'}">
              <a-icon type="form"/>
              <span>Order Information</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="{name: 'product-management'}">
              <a-icon type="gift"/>
              <span>Product Information </span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link :to="{name: 'my-info'}">
              <a-icon type="user"/>
              <span>My Information</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout :style="{ height: screenHeight + 'px' }">
        <a-layout-header class="title-system" style="background: #fff; padding: 0">
          <img src="../../static/logo.png">
          <span class="title">Merchant management</span>
          <div class="User">
            <router-link :to="{name: 'login'}">Logout</router-link>
            <a-icon
              style="margin-left:20px;margin-right:5px"
              type="user"
            />
            <span style="font-family:'Roboto Regular'">{{shopName}}</span>
          </div>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      screenHeight: document.body.clientHeight
    }
  },
  computed: {
    shopName () {
      return sessionStorage.getItem('shopName')
    }
  },
  mounted () {
    this.$router.push({name: 'order-info'})
  }
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px 0 14px;
  cursor: pointer;
  color: #ffffff;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}

.title {
  font-size: 24px;
  padding: 0 6px;
  font-weight: bold;
}

.title-system img {
  width: 5%;
  position: relative;
  bottom: 5px;
}

.User {
  font-size: 16px;
  display: inline;
  position: absolute;
  top: -0.2px;
  right: 40px;
}
</style>
