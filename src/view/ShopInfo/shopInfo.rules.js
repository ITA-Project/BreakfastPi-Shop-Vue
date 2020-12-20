export default {
  computed: {
    rules () {
      return {
        name: [
          {required: true, message: 'Please input shop name', trigger: 'blur'}
        ],
        region: [{required: true, message: 'Please select shop region', trigger: 'blur'}],
        detailAddress: [{required: true, message: 'Please input detail address', trigger: 'blur'}],
        phone: [
          {required: true, message: 'Please input shop phone', trigger: 'change'}
        ],
        description: [{required: true, message: 'Please input activity form', trigger: 'blur'}]
      }
    }
  }
}
