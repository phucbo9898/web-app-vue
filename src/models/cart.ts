export class CartProduct {
    id!: string
    category_id!: string
    name!: string
    image!: string
    price!: number
    qty_pay!: number
    sale!: number

    constructor(init?: CartProduct) {
        Object.assign(this, init);
    }
}

export class InformationPayment {
    name!: string
    address!: string
    phone!: string
    note!: string

    constructor(init?: InformationPayment) {
        Object.assign(this, init);
    }
}