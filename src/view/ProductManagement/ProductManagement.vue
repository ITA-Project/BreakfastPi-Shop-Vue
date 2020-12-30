<template>
  <div>
    <a-button type="primary" @click="onAddCategoryClick"> <a-icon type="plus" />Add Category</a-button>
    <a-button type="primary" @click="onAddProductClick"> <a-icon type="plus" />Add Product</a-button>
    <a-table
      :columns="columns"
      :data-source="categories"
      :row-key="record => record.id"
      :pagination="false"
      :expandRowByClick="true"
      class="components-table-demo-nested">

      <template slot="status" slot-scope="text">
        <span v-if="text">
          <a-badge status="success"/>Active
        </span>
        <span v-else>
          <a-badge status="default"/>Inactive
        </span>
      </template>
      <template slot="dateTime" slot-scope="text">
        <span>
          {{text | dateTime}}
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
          <a-tag
            :color="text === 0 ? 'pink' : text === 1 ? 'green': text ===-2? '#426b54': 'grey'"
          >
            {{ statusDesc[formatStatus(text)].toUpperCase() }}
          </a-tag>
        </template>
        <template slot="dateTime" slot-scope="text">
        <span>
          {{text | dateTime}}
        </span>
        </template>

        <template slot="inner-action" slot-scope="text, record, index" class="table-operation">
          <a @click="onProductEdit(record)">Edit</a>
          <a @click="onProductDelete(record.id)">Delete</a>
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
        :width="450"
        :visible="productDrawerVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onProductDrawerClose"
      >
        <a-form :form="productForm" layout="horizontal">
          <a-row>
            <a-col>
              <a-form-item label="Category" has-feedback>
                <a-select
                  v-decorator="[
                    'categoryId',
                    { rules: [{ required: true, message: 'Please select category!' }] },
                  ]"
                  placeholder="Please select a category"
                >
                  <a-select-option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{category.name}}
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
              <a-form-item label="Price">
                <a-input-number
                  v-decorator="[
                    'price',
                    {
                      rules: [{required: true}],
                      initialValue: 5
                    }
                  ]"
                  :min="0" :max="999" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Stock">
                <a-input-number
                  v-decorator="[
                    'stock',
                    {
                      rules: [{required: true}],
                      initialValue: 100
                    }
                  ]"
                  :min="0" :max="999999" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="isEditProduct && isEditStatus">
            <a-col>
              <a-form-item label="Status">
                <a-select v-decorator="['status', { initialValue: 1}]" :disabled="!isEditStatus" >
                  <a-select-option :value="-2">
                    已下架
                  </a-select-option>
                  <a-select-option :value="1">
                    上架
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="Result" v-if="isEditProduct && isShowResult">
                <a-input v-decorator="['statusDescription']" disabled/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-upload
                :before-upload="beforeUpload"
                list-type="picture"
                :file-list="fileList"
                @change="handleAttachmentChange"
              >
                <a-button> <a-icon type="upload" /> upload </a-button>
              </a-upload>
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
import productService from '../../service/product'

export default {
  name: 'ProductManagement',
  mixins: [columnsConfig],
  data () {
    return {
      categories: [],
      categoryForm: this.$form.createForm(this),
      categoryDrawerVisible: false,
      isCreateCategory: false,
      isEditCategory: false,
      productForm: this.$form.createForm(this),
      productDrawerVisible: false,
      isCreateProduct: false,
      isEditProduct: false,
      fileList: [],
      productStatus: 0,
      fileName: '',
      isEditStatus: false,
      isShowResult: false,
      statusDesc: ['待审核', '上架', '审核不通过', '已下架']
    }
  },
  mounted () {
    this.loadCategoriesAndProducts(this.shopId)
  },
  computed: {
    shopId () {
      return this.$store.state.shop.id
    }
  },
  methods: {
    formatStatus (value) {
      if (value < 0) {
        return 1 - value
      }
      return value
    },
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
      this.fileList = []
      this.showProductDrawer()
    },
    showProductDrawer () {
      this.productDrawerVisible = true
    },
    onProductDrawerClose () {
      this.productDrawerVisible = false
      this.productForm.resetFields()
      this.isCreateProduct = false
      this.isEditProduct = false
    },
    onProductFormSubmit () {
      if (this.isCreateProduct) {
        this.createProduct()
      } else if (this.isEditProduct) {
        this.updateProduct()
      }
    },
    createProduct: function () {
      this.productForm.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return
        }
        const files = this.newFile()
        const isExistFile = this.fileList.filter(o => o.id !== undefined).length > 1
        const formData = new FormData()
        if (isExistFile || files.length > 1) {
          this.$message.error('只能上传一张图片！')
        } else {
          formData.append('file', files[0])
          productService.checkImage(formData).then((res) => {
            let isIllegal = false
            if (res.type === '正常' && res.confidence === 0) {
              this.productStatus = 1
            }
            if (res.type !== undefined && (res.type !== '正常' && res.confidence === 0)) {
              this.productStatus = 0
            }
            if (res.type !== undefined && res.confidence > 0) {
              isIllegal = true
              this.$message.error('该图片含有违禁信息！')
            }
            if (!isIllegal) {
              this.uploadFile().then(response => {
                values.imageUrl = this.fileName
                values.status = this.productStatus
                productService.create(values).then(resp => {
                  this.loadCategoriesAndProducts(this.shopId)
                  this.onProductDrawerClose()
                }).catch(err => {
                  console.log(err)
                })
              }).catch(err => {
                console.log(err)
              })
            }
          })
        }
      })
    },
    updateProduct: function () {
      this.productForm.validateFields((err, values) => {
        if (err) {
          console.log(err)
          return
        }
        const files = this.newFile()
        const isExistFile = this.fileList.filter(o => o.id !== undefined).length > 0
        const formData = new FormData()
        if (isExistFile && files.length > 0) {
          this.$message.error('只能上传一张图片！')
        } else {
          formData.append('file', files[0])
          productService.checkImage(formData).then((res) => {
            let isIllegal = false
            if (res.type === '正常' && res.confidence === 0) {
              this.productStatus = 1
            }
            if (res.type !== undefined && (res.type !== '正常' && res.confidence === 0)) {
              this.productStatus = 0
            }
            if (res.type !== undefined && res.confidence > 0) {
              isIllegal = true
              this.$message.error('该图片含有违禁信息！')
            }
            if (!isIllegal) {
              this.uploadFile().then(response => {
                values.imageUrl = this.fileName
                values.status = this.productStatus
                productService.update(values).then(resp => {
                  this.loadCategoriesAndProducts(this.shopId)
                  this.onProductDrawerClose()
                }).catch(err => {
                  console.log(err)
                })
              }).catch(err => {
                console.log(err)
              })
            }
          })
        }
      })
    },
    onProductDelete (productId) {
      const self = this
      productService.deleteById(productId).then(resp => {
        self.loadCategoriesAndProducts(self.shopId)
      }).catch(err => {
        console.log(err)
      })
    },
    onProductEdit (record) {
      this.isEditProduct = true
      this.showProductDrawer()
      this.$nextTick(() => {
        this.productForm.setFieldsValue({
          categoryId: record.categoryId,
          id: record.id,
          name: record.name,
          description: record.description,
          price: record.price,
          stock: record.stock,
          status: record.status,
          statusDescription: record.statusDescription
        })
      })
      this.isEditStatus = record.status === 1 || record.status === -2
      this.isShowResult = record.status === -1
      this.fileList = [{
        uid: '-1',
        id: record.imageUrl + Math.random() * 10,
        name: record.imageUrl.substring(record.imageUrl.lastIndexOf('/') + 1, record.imageUrl.length),
        status: 'done',
        url: record.imageUrl.includes('https://ftp.bmp.ovh/imgs') ? record.imageUrl : 'http://106.53.102.70/resources/' + record.imageUrl,
        thumbUrl: record.imageUrl.includes('https://ftp.bmp.ovh/imgs') ? record.imageUrl : 'http://106.53.102.70/resources/' + record.imageUrl
      }]
    },
    beforeUpload (file) {
      const allowType = 'gif;jpg;jpeg;png'
      const isAllowType = allowType.includes(file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length))
      if (!isAllowType) {
        this.$message.error('文件格式有问题！')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('文件大小超过5M')
      }
      if (!isAllowType || !isLt5M) {
        // eslint-disable-next-line no-param-reassign
        file.status = 'error'
      }
      return false
    },
    handleAttachmentChange (info) {
      this.fileList = [...info.fileList].map((file) => {
        const tmpFile = file
        if (tmpFile.response) {
          tmpFile.url = 'about:blank'
        }
        return tmpFile
      })
    },
    uploadFile () {
      const files = this.newFile()
      const formData = new FormData()
      const type = files[0].name.substr(files[0].name.lastIndexOf('.') + 1, files[0].name.length)
      this.fileName = files[0].name.substr(0, files[0].name.lastIndexOf('.')) + new Date().getTime() + '.' + type
      formData.append('file', files[0], this.fileName)
      return productService.uploadAttachment(formData)
    },
    newFile () {
      return this.fileList
        .filter(o => o.status !== 'error' && o.id === undefined)
        .map(n => n.originFileObj)
    }
  }
}
</script>

<style scoped>

</style>
