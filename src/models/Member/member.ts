export class RegisterMember {
    email: string = ''
    password: string = ''
    first_name: string = ''
    last_name: string = ''
    phone_number: string = ''
    address: string = ''
  
    constructor(init?: Partial<RegisterMember>) {
      Object.assign(this, init)
    }
}
  