import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'userInfor'})
class UserInfo extends VuexModule {
    user_default: any = {
        id: '',
        name: '',
        email: '',
        phone: '',
        avatar: '',
        address: '',
        role: '',
        status: '',
    }
    user: any = this.user_default
    @Mutation
    handleUserProfile(user_profile: string) {
        this.user = user_profile
    }

    @Action({ rawError: true})
    HANDLE_USER_PROFILE(user_profile: string) {
        this.context.commit('handleUserProfile', user_profile)
    }

    @Mutation
    resetDefault() {
        this.user = this.user_default;
    }

    @Action({ rawError: true})
    RESET_DEFAULT() {
        this.context.commit('resetDefault');
    }
}

export default UserInfo