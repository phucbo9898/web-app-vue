export default function Worker () {
    self.addEventListener('message', e => {
        console.log('worker got', e);
    })
}