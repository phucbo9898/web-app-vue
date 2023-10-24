import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'auth'})
class Auth extends VuexModule {
    token?: string | null

    @Mutation
    setNewToken(newToken: string) {
        this.token = newToken
    }

    @Mutation
    setTokenNull() {
        this.token = null
    }

    @Action
    SET_NEW_TOKEN(newToken: string) {
        this.context.commit('setNewToken', newToken)
    }

    @Action
    SET_TOKEN_NULL() {
        this.context.commit('setTokenNull')
    }
}

export default Auth