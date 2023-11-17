<template>
  <b-modal
    :id="id"
    hide-footer
    centered
   
    header-class="modal-success-header"
    header-bg-variant="success"
  >
    <div>
      <div class="text-pre text-center pt-3 mb-10">
        {{ successMess }}
      </div>
      <div class="text-center mb-1 mt-3">
        <button @click="hideModal" class="btn btn-secondary">
          {{ $t('common.btn.btn_back') }}
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalSuccess extends Vue {
  @Prop({ default: 'modal-success' }) private id!: string
  @Prop() private successMess!: string
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
      }, this.closeSeconds * 1000)
    }
  }
}
</script>

<style lang="scss">
.modal-success-header {
  background-color: #8fdcc0 !important
}

.modal-success-header > .close {
  border: 0px !important;
  background-color: #8fdcc0 !important
}
</style>
