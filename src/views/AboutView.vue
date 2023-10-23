<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" name="testInput" v-model="testInput">
    <span>{{ testInput }}</span>
    <h1>test</h1>
    <h2>test02</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AboutVie extends Vue{
  private testInput: any = ''
}
</script>
