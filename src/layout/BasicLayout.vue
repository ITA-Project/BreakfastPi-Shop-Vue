<template>
  <div  :style="{ height: screenHeight + 'px' }">
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" >
        <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="() => (collapsed = !collapsed)"
      />
      </div>
      <a-menu theme="dark"
              mode="inline"
              :default-selected-keys="['1']"
              :multiple="false"
      >
        <a-menu-item key="1">
          <router-link :to="{name: 'order-info'}">
            <a-icon type="form" />
            <span>Order Information</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{name: 'product-management'}">
            <a-icon type="gift" />
            <span>Product Information </span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="{name: 'my-info'}">
            <a-icon type="user" />
            <span>My Information</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ height: screenHeight + 'px' }">
      <a-layout-header style="background: #fff; padding: 0" class="title-system">
        <img src="../../static/logo.png">
        <span class="title">Merchant management</span>
        <div class="User">
          <span style="font-family:'Roboto Bold'">Welcome</span>
          <a-icon
            type="user"
            style="margin-left:20px;margin-right:5px"
          />
          <span style="font-family:'Roboto Regular'">XXX</span>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
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
  .title{
    font-size: 24px;
    padding:0 6px;
    font-weight: bold;
  }
  .title-system img{
    width:5%;
    position:relative;
    bottom:5px;
  }
  .User{
    font-size: 16px;
    display: inline;
    position: absolute;
    top:-0.2px;
    right:40px;
  }
</style>
