<template>
  <div>
    <a-button type="primary" @click="showDrawer"> <a-icon type="plus" />Add</a-button>
    <a-table
      :columns="columns"
      :data-source="categories"
      :row-key="record => record.id"
      :pagination="false"
      class="components-table-demo-nested">

      <template slot="status" slot-scope="text">
        <span v-if="text">
          <a-badge status="success"/>Active
        </span>
        <span v-else>
          <a-badge status="default"/>Inactive
        </span>
      </template>

      <template slot="action" slot-scope="text, record, index">
        <a>Edit</a>
        <a @click="onCategoryDelete(record.id)">Delete</a>
      </template>

      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerColumns"
        :data-source="text.products"
        :pagination="false"
        :row-key="record => record.id"
      >

        <template slot="inner-status" slot-scope="text">
          <span v-if="text">
            <a-badge status="success"/>Active
          </span>
          <span v-else>
            <a-badge status="default"/>Inactive
          </span>
        </template>

        <template slot="inner-action" slot-scope="text" class="table-operation">
          <a>Edit</a>
          <a>Delete</a>
        </template>

      </a-table>
    </a-table>

    <div>
      <a-drawer
        title="Create a new category"
        :width="360"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="horizontal">
          <a-row>
            <a-col>
              <a-form-item label="Sequence">
                <a-input
                  v-decorator="[
                  'sequence',
                  {
                    rules: [{ required: true, message: 'Please enter category sequence' }],
                  },
                ]"
                  placeholder="Please enter category sequence"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Name">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'Please enter category name' }],
                  },
                ]"
                  placeholder="Please enter category name"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Status">
                <a-switch v-decorator="['status', { initialValue: true, valuePropName: 'checked' }]" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="onSubmit">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>

import columnsConfig from './columns.config'
import shopService from '../../service/shop'
import categoryService from '../../service/category'

export default {
  name: 'ProductManagement',
  mixins: [columnsConfig],
  data () {
    return {
      shopId: 1,
      categories: [],
      form: this.$form.createForm(this),
      visible: false
    }
  },
  mounted () {
    const shopId = this.shopId
    this.loadCategoriesAndProducts(shopId)
  },
  methods: {
    loadCategoriesAndProducts (shopId) {
      const self = this
      shopService.getShopDetailsByShopId(shopId).then(resp => {
        self.categories = resp.categories
      }).catch(err => {
        console.log(err)
      })
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    onSubmit () {
      const self = this
      self.form.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return
        }
        categoryService.createByShopId(this.shopId, values).then(resp => {
          self.loadCategoriesAndProducts(self.shopId)
        }).catch(err => {
          console.log(err)
        })
        self.onClose()
      })
      self.form.resetFields()
    },
    onCategoryDelete (categoryId) {
      const self = this
      categoryService.deleteById(categoryId).then(resp => {
        self.loadCategoriesAndProducts(self.shopId)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
