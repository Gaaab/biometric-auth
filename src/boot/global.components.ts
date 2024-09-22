/* eslint-disable @typescript-eslint/no-explicit-any */
import { boot } from 'quasar/wrappers'
import CustomComponentInput from 'src/Common/CustomComponentInput.vue'
import CustomComponentSelect from 'src/Common/CustomComponentSelect.vue'
import CustomComponentButton from 'src/Common/CustomComponentButton.vue'

export default boot(({ app }) => {
  app.component('qc-input', CustomComponentInput)
  app.component('qc-select', CustomComponentSelect)
  app.component('qc-btn', CustomComponentButton)
})
