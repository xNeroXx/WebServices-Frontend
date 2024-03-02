export interface CurrentUserData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  username: string,
  address: {
    street: string,
    house_number: number,
    postal_code: number,
    city: string,
    country: string,
    state: string
  }
}
