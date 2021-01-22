import axiosBase from 'axios';
import { 
    UserResponse, 
    UserSubmit, 
    User, 
    ArticlesResponse, 
    Profile, 
    ProfileResponse, 
    UserForUpdate
} from './models';

export const axios = axiosBase.create({
    baseURL: 'https://conduit.productionready.io/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json' ,
});

export function setJWT(jwt: string) {
    axios.defaults.headers.common.Authorization = `Token ${jwt}`;
}

export function clearJWT(jwt: string) {
    delete axios.defaults.headers.common.Authorization;
}

export async function loginUser(user: UserSubmit): Promise<User> {
    const response = await axios.post('/users/login', {
        user,
    });
    return (response.data as UserResponse).user;
}

export async function fetchUser(): Promise<User> {
    const response = await axios.get('/user');
    return (response.data as UserResponse).user;
}

export async function fetchProfile(username: string): Promise<Profile> {
    const response = await axios.get(`/profiles/${username}`);
    return (response.data as ProfileResponse).profile;
}

export async function getGlobalFeed(): Promise<ArticlesResponse> {
    const response = await axios.get('/articles');
    return response.data as ArticlesResponse;
}

export async function updateUser(user: UserForUpdate): Promise<User> {
    const response = await axios.put('/user', user);
    return (response.data as UserResponse).user;
}
