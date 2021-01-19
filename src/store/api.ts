import axiosBase from 'axios';
import { UserResponse, UserSubmit, User } from './models';

export const axios = axiosBase.create({
    baseURL: 'https://conduit.productionready.io/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json' ,
});

export function setJWT(jwt: string) {
    axios.defaults.headers.common['Authorization'] = `Token ${jwt}`;
}

export function clearJWT(jwt: string) {
    delete axios.defaults.headers.common['Authorization'];
}

export async function loginUser(user: UserSubmit): Promise<User> {
    const response = await axios.post('/users/login', {
        user
    });
    return (response.data as UserResponse).user;
}