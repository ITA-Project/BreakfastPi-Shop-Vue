<template>
  <div>
    <a-button type="primary" @click="onAddCategoryClick"> <a-icon type="plus" />Add Category</a-button>
    <a-button type="primary" @click="onAddProductClick"> <a-icon type="plus" />Add Product</a-button>
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
        <a @click="onCategoryEdit(record)">Edit</a>
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
        title="Category form"
        :width="360"
        :visible="categoryDrawerVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onCategoryDrawerClose"
      >
        <a-form :form="categoryForm" layout="horizontal">
          <a-row>
            <a-col>
              <a-form-item label="Id">
                <a-input
                  v-decorator="['id']"
                  :disabled="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
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
          <a-button :style="{ marginRight: '8px' }" @click="onCategoryDrawerClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="onCategoryFormSubmit">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </div>

    <div>
      <a-drawer
        title="Product form"
        :width="360"
        :visible="productDrawerVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onProductDrawerClose"
      >
        <a-form :form="productForm" layout="horizontal">
          <a-row>
            <a-col>
              <a-form-item label="Category Id" has-feedback>
                <a-select
                  v-decorator="[
                    'categoryId',
                    { rules: [{ required: true, message: 'Please select category id!' }] },
                  ]"
                  placeholder="Please select a category id"
                >
                  <a-select-option value=1>
                    1
                  </a-select-option>
                  <a-select-option value=2>
                    2
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Id">
                <a-input
                  v-decorator="['id']"
                  :disabled="true"
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
                    rules: [{ required: true, message: 'Please enter product name' }],
                  },
                ]"
                  placeholder="Please enter product name"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Description">
                <a-input
                  v-decorator="[
                  'description',
                  {
                    rules: [{ required: true, message: 'Please enter product description' }],
                  },
                ]"
                  placeholder="Please enter product description"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Image">
                <a-input
                  v-decorator="[
                  'image',
                  {
                    rules: [{ required: true, message: 'Please enter product image' }],
                  },
                ]"
                  placeholder="Please enter product image"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Price">
                <a-input-number v-decorator="['price', { initialValue: 5 }]" :min="0" :max="999" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Stock">
                <a-input-number v-decorator="['stock', { initialValue: 100 }]" :min="0" :max="999999" />
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
          <a-button :style="{ marginRight: '8px' }" @click="onProductDrawerClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="onProductFormSubmit">
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
      categoryForm: this.$form.createForm(this),
      categoryDrawerVisible: false,
      isCreateCategory: false,
      isEditCategory: false,
      productForm: this.$form.createForm(this),
      productDrawerVisible: false,
      isCreateProduct: false,
      isEditProduct: false
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
    onAddCategoryClick () {
      this.isCreateCategory = true
      this.showCategoryDrawer()
    },
    showCategoryDrawer () {
      this.categoryDrawerVisible = true
    },
    onCategoryDrawerClose () {
      this.categoryDrawerVisible = false
      this.categoryForm.resetFields()
      this.isCreateCategory = false
      this.isEditCategory = false
    },
    onCategoryFormSubmit () {
      if (this.isCreateCategory) {
        this.createCategory()
      } else if (this.isEditCategory) {
        this.updateCategory()
      }
      this.categoryForm.resetFields()
    },
    createCategory: function () {
      this.categoryForm.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return
        }
        categoryService.createByShopId(this.shopId, values).then(resp => {
          this.loadCategoriesAndProducts(this.shopId)
        }).catch(err => {
          console.log(err)
        })
        this.onCategoryDrawerClose()
      })
    },
    updateCategory: function () {
      this.categoryForm.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return
        }
        categoryService.update({...values, shopId: this.shopId}).then(resp => {
          this.loadCategoriesAndProducts(this.shopId)
        }).catch(err => {
          console.log(err)
        })
        this.onCategoryDrawerClose()
      })
    },
    onCategoryDelete (categoryId) {
      const self = this
      categoryService.deleteById(categoryId).then(resp => {
        self.loadCategoriesAndProducts(self.shopId)
      }).catch(err => {
        console.log(err)
      })
    },
    onCategoryEdit (record) {
      this.isEditCategory = true
      this.showCategoryDrawer()
      this.$nextTick(() => {
        this.categoryForm.setFieldsValue({
          id: record.id,
          sequence: record.sequence,
          name: record.name,
          status: record.status
        })
      })
    },
    onAddProductClick () {
      this.isCreateProduct = true
      this.showProductDrawer()
    },
    showProductDrawer () {
      this.productDrawerVisible = true
    },
    onProductDrawerClose () {
      this.productDrawerVisible = false
      this.isCreateProduct = false
      this.isEditProduct = false
    },
    onProductFormSubmit () {
      const self = this
      if (this.isCreateProduct) {
        this.createProduct()
      } else if (this.isEditProduct) {
        this.updateProduct()
      }
      self.form.resetFields()
    },
    createProduct: function () {
      // this.productForm.validateFields((err, values) => {
      //   if (err) {
      //     console.log(err)
      //     return
      //   }
      //   productService.createByShopId(this.shopId, values).then(resp => {
      //     this.loadCategoriesAndProducts(this.shopId)
      //   }).catch(err => {
      //     console.log(err)
      //   })
      //   this.onProductDrawerClose()
      // })
    },
    updateProduct: function () {
      // this.productForm.validateFields((err, values) => {
      //   if (err) {
      //     console.log(err)
      //     return
      //   }
      //   productService.update({...values, shopId: this.shopId}).then(resp => {
      //     this.loadCategoriesAndProducts(this.shopId)
      //   }).catch(err => {
      //     console.log(err)
      //   })
      //   this.onProductDrawerClose()
      // })
    },
    onProductDelete (productId) {
      // const self = this
      // productService.deleteById(productId).then(resp => {
      //   self.loadCategoriesAndProducts(self.shopId)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    onProductEdit (record) {
      // this.isEditProduct = true
      // this.showProductDrawer()
      // this.$nextTick(() => {
      //   this.productForm.setFieldsValue({
      //     id: record.id,
      //     sequence: record.sequence,
      //     name: record.name,
      //     status: record.status
      //   })
      // })
    }
  }
}
</script>

<style scoped>

</style>
