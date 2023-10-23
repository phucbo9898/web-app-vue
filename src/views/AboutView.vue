<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" name="testInput" v-model="testInput">
    <span>{{ testInput }}</span>
    <button @click="submitInput" class="btn btn-secondary">Click</button>
    <button @click="resetInput" class="btn btn-secondary">Reset</button>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import Auth from '@/store/modules/Auth';
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
const AuthModule = getModule(Auth, store)
@Component
export default class AboutVie extends Vue{
  private testInput: any = ''

  submitInput() {
    AuthModule.SET_NEW_TOKEN(this.testInput)
  }

  resetInput() {
    AuthModule.setTokenNull()
  }
}
</script>
