<template>
  <div
    v-if="active"
    class="h-100 w-100 z-2000 top-0 start-0 transition position-fixed flex-center"
  >
    <div v-if="isMobile" class="spinner-border text-primary" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BlockView extends Vue {
  @Prop({ default: false }) private active!: boolean
  private isMobile: boolean = false
}
</script>
