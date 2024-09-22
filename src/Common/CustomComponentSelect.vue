<script lang="ts">
import { QSelect } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  extends: QSelect,
  props: {
    outlined: {
      type: Boolean,
      default: true,
    },
    stackLabel: {
      type: Boolean,
      default: true,
    },
    dropdownIcon: {
      type: String,
      default: 'la-angle-down',
    },
    inputClass: {
      type: [String, Array, Object],
      default: () => ['custom--select'],
    },
  },
  setup(props, context) {
    // @ts-ignore
    const renderFn = QSelect.setup(props, context)

    return renderFn
  },
})
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.q-field--float .q-field__label {
  transform: translateY(-100%) translateX(-5px) scale(0.75);
  //transform: translateY(-120%) translateX(-5px) scale(0.75);
  background: #fafafa;
  padding: 0 5px;
  padding-top: -20px !important;
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
  padding: 0px !important;
}
.q-field--auto-height.q-field--labeled .q-field__control-container {
  padding-top: 3px !important;
}
.q-select__dropdown-icon {
  color: $primary;
}
</style>
