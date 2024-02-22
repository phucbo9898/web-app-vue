// @ts-ignore
import Worker from '../ServiceWorker/worker'
// @ts-ignore
const worker = new Worker()

export function sendMessage(msg: any) {
    worker.postMessage(msg)
}