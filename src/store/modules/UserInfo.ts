import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'userInfor'})
class UserInfo extends VuexModule {
    user_default: any = {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        avatar: '',
        address: '',
        role: '',
        status: '',
        setting_language: '',
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
    handleUserAvatar(avatar: string) {
        this.user.avatar = avatar;
    }

    @Action({ rawError: true})
    HANDLE_USER_AVATAR(avatar: string) {
        this.context.commit('handleUserAvatar', avatar)
    }

    @Mutation
    handleUserSettingLanguage(language: string) {
        this.user.setting_language = language;
    }

    @Action({ rawError: true})
    HANDLE_USER_SETTING_LANGUAGE(language: string) {
        this.context.commit('handleUserSettingLanguage', language)
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