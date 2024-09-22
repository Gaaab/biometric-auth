<script lang="ts">
import { QInput } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  extends: QInput,
  props: {
    outlined: {
      type: Boolean,
      default: true,
    },
    stackLabel: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    // @ts-ignore
    const renderFn = QInput.setup(props, context)

    return renderFn
  },
})
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.q-field--float .q-field__label {
  transform: translateY(-120%) translateX(-5px) scale(0.75);
  background: #fafafa;
  padding: 0 5px;
  z-index: 10;
}

.q-field--dense.q-field--float .q-field__label {
  transform-origin: left top;
}
.q-field--outlined .q-field__control {
  border-radius: 10px !important;
}
.q-field__control {
  color: $primary !important;
  border: 1px !important;
}
.q-field--labeled .q-field__native {
  padding-top: 10px !important;
}
</style>
