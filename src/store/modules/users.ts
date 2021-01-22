import { VuexModule, Module, getModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserForUpdate, UserSubmit } from '../models';
import { fetchProfile, fetchUser, loginUser, setJWT, updateUser } from '../api';

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

    @MutationAction
    public async loadUser() {
        const user = await fetchUser();
        return { user };
    }

    @Action({commit: 'setUser', rawError: true})
    public async login(userSubmit: UserSubmit) {
        try {
            const user = await loginUser(userSubmit);
            setJWT(user.token);
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

    @Action({commit: 'setUser', rawError: true})
    public async updateselfProfile(userUpdateField: UserForUpdate) {
        const user = await updateUser(userUpdateField);
        return user;
    }
}

export default getModule(UsersModule);
