<template>
    <div class="border border-radius-10 p-3">
        <div class="mb-40">
            <div class="d-flex p-3">
                <span class="mr-10">Current email:</span>
                <span>{{ $store.state.userInfor.user.email }}</span>
            </div>
            <div class="p-3">
                <router-link to="/setting/change-email" class="btn btn-primary">Change Email</router-link>
            </div>
        </div>
        <div>
            <div class="d-flex p-3">
                <span class="mr-10">Current password:</span>
                <span v-for="i in 10" :key="i" class="dot"></span>
            </div>
            <div class="p-3">
                <router-link to="/setting/change-password" class="btn btn-primary">Change Password</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
@Component
export default class SettingAccount extends Vue {}
</script>

<style>
.dot {
    height: 25px;
    width: 25px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
}
</style>