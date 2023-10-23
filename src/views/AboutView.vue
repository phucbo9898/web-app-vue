<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" name="testInput" v-model="testInput" />
    <span>{{ testInput }}</span>
    <button @click="submitInput" class="btn btn-secondary">Click</button>
    <button @click="resetInput" class="btn btn-secondary">Reset</button>

    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
      >
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
      />
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
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
