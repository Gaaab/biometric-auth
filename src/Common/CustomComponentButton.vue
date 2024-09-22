<script lang="ts">
import { QBtn } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  extends: QBtn,
  props: {
    rounded: {
      type: Boolean,
      default: true,
    },
    noCaps: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  setup(props, context) {
    // @ts-ignore
    const renderFn = QBtn.setup(props, context)

    return renderFn
  },
})
</script>
