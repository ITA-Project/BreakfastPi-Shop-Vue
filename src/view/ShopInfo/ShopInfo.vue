<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="Shop Name" prop="name">
      <a-input
        :disabled="!editable"
        v-model="form.name"
      />
    </a-form-model-item>
    <a-form-model-item label="Shop Region" prop="region">
      <a-cascader v-model="form.region" :disabled="!editable" :options="options" placeholder="please select region"/>
    </a-form-model-item>
    <a-form-model-item label="Shop Detail Address"  prop="detailAddress">
      <a-input
        v-model="form.detailAddress"
        :disabled="!editable"
      />
    </a-form-model-item>
    <a-form-model-item label="Shop phone" prop="phone">
      <a-input
        :disabled="!editable"
        v-model="form.phone"
      />
    </a-form-model-item>
    <a-form-model-item label="Shop Description" prop="description">
      <a-input :disabled="!editable" v-model="form.description" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button  v-if="!editable" type="primary" @click="() => editable = true">
        Edit
      </a-button>
      <a-button v-if="editable" type="primary" @click="onSubmit">
        Update
      </a-button>
      <a-button v-if="editable" style="margin-left: 10px;" @click="() => editable = false">
        Cancel
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import rules from './shopInfo.rules'
import shopService from '../../service/shop'
import lodash from 'lodash'
export default {
  name: 'ShopInfo',
  mixins: [rules],
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        id: undefined,
        name: '',
        region: [],
        detailAddress: undefined,
        phone: '',
        description: ''
      },
      options: [
        {
          value: '珠海市',
          label: '珠海市',
          children: [
            {
              value: '香洲区',
              label: '香洲区'
            },
            {
              value: '斗门区',
              label: '斗门区'
            },
            {
              value: '金湾区',
              label: '金湾区'
            },
            {
              value: '其他区',
              label: '其他区'
            }
          ]
        }
      ],
      editable: false
    }
  },
  mounted () {
    this.initShopInfo()
  },
  computed: {
    shopId () {
      return this.$store.state.shop.id
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const param = {
            id: this.form.id,
            name: this.form.name,
            description: this.form.description,
            phone: this.form.phone,
            address: this.form.region.join('') + this.form.detailAddress
          }
          shopService.updateShopInfo(param).then((response) => {
            if (response === 1) {
              this.$message.success('Update Successfully!')
              this.initShopInfo()
              this.editable = false
            }
          })
        } else {
          return false
        }
      })
    },
    initShopInfo () {
      shopService.getShopById(this.shopId).then((response) => {
        const data = lodash.cloneDeep(response)
        if (lodash.isEmpty(response.address) || response.address.indexOf('珠海市') < 0) {
          data.region = ['珠海市', '其他区']
          data.detailAddress = response.address
        } else {
          const index = response.address.indexOf('珠海市') + 3
          data.region = [response.address.substring(0, index), response.address.substring(index, index + 3)]
          data.detailAddress = response.address.substring(index + 3)
        }
        this.form = data
      })
    }
  }
}
</script>
