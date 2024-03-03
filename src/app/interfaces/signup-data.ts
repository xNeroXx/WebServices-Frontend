export interface SignupData {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  username: string,
  address: {
    street: string,
    house_number: number,
    postal_code: string,
    city: string,
    country: string
  }
}
