import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserSubmit } from '../models';
import { fetchProfile, loginUser } from '../api';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true,
})
class UsersModule extends VuexModule {
    public user: User | null = null;
    public profile: Profile | null = null;

    @Mutation
    public setUser(user: User) { this.user = user; }

    @Mutation
    public setProfile(profile: Profile) { this.profile = profile; }

    get username() {
        return this.user || null;
    }

    @Action({commit: 'setUser', rawError: true})
    public async login(userSubmit: UserSubmit) {
        try {
            const user = await loginUser(userSubmit);
            return user;
        } catch (e) {
            throw new Error('Invalid username or password');
        }
    }

    @Action({commit: 'setProfile', rawError: true})
    public async loadProfile(username: string) {
        const profile = await fetchProfile(username);
        return profile;
    }
}

export default getModule(UsersModule);
