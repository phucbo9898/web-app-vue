import store from "@/store";

export default function AuthHeader() {
    let token = store.state.auth.token
    if (token) {
        return { Authorization: 'Bearer ' + token}
    } else {
        return {}
    }
}