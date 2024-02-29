<template>
  <b-modal
    :id="id"
    hide-footer
    centered
    @hidden="hideModal"
    @show="hanldeAutoClose"
    header-class="modal-warning-header"
    header-bg-variant=""
  >
    <div>
      <div class="text-pre text-center pt-3 mb-10">
        {{ errorMess }} {{ nameRoute ?? 'home'}}
      </div>
      <div class="text-center mb-1 mt-3">
        <button @click="hideModal" class="btn btn-secondary">
          {{ $t('common.btn.btn_back') }}
        </button>
      </div>
    </div>
  </b-modal>
</template>

<style lang="scss" scoped>
#modal-warning-text-editor___BV_modal_outer_ {
  z-index: 9998 !important;
}

#modal-warning-text-editor {
  z-index: 9999 !important;
}
</style>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalWarning extends Vue {
  @Prop({ default: 'modal-warning' }) private id!: string
  @Prop() private errorMess!: string
  @Prop() private nameRoute!: string
  @Prop({ default: 3 }) private closeSeconds!: number
  @Prop({ default: true }) private autoClose!: boolean

  hideModal() {
    this.$bvModal.hide(this.id)
    setTimeout(() => {
      this.$emit('close')
      clearTimeout()
    }, 300)
  }

  hanldeAutoClose() {
    if (this.autoClose) {
      setTimeout(() => {
        this.$bvModal.hide(this.id)
        clearTimeout()
        // this.$router.push({ name: redirectRoute })
      }, this.closeSeconds * 1000)
    }
  }
}
</script>

<style lang="scss">
.modal-warning-header {
  background-color: #ffc107 !important;
}

.modal-warning-header > .close {
  border: 0px !important;
  background-color: #ffc107 !important
}
</style>
