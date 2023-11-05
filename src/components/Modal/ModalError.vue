<template>
  <b-modal
    :id="id"
    hide-footer
    centered
    @hidden="hideModal"
    @show="hanldeAutoClose"
    header-class="modal-error-header"
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
#modal-error-text-editor___BV_modal_outer_ {
  z-index: 9998 !important;
}

#modal-error-text-editor {
  z-index: 9999 !important;
}
</style>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalError extends Vue {
  @Prop({ default: 'modal-error' }) private id!: string
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
.modal-error-header {
  background-color: rgb(216, 26, 90) !important;
}

.modal-error-header > .close {
  border: 0px !important;
  background-color: rgb(216, 26, 90) !important
}
</style>
