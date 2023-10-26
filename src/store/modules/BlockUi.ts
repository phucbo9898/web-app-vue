import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'blockUi'})
class BlockUi extends VuexModule {
    active: boolean = false

    @Mutation
    setActive(active: boolean) {
        this.active = active
    }

    @Action
    SET_ACTIVE(active: boolean, addOverFlow?: boolean) {
        this.context.commit('setActive', active)
        if (active) {
            document.body.style.cursor = 'wait'
            addOverFlow ? document.body.classList.add('body-block-ui') : ''
        } else {
            document.body.style.cursor = 'auto'
            addOverFlow ? document.body.classList.remove('body-block-ui') : ''
        }
    }
}

export default BlockUi