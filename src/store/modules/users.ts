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
    user: User | null = null;
    profile: Profile | null = null;

    @Mutation
    setUser(user: User) { this.user = user }

    @Mutation
    setProfile(profile: Profile) { this.profile = profile }

    get username() {
        return this.user || null;
    }

    @Action({commit: 'setUser', rawError: true})
    async login(userSubmit: UserSubmit) {
       const user = await loginUser(userSubmit);
       return user;
    }

    @Action({commit: 'setProfile', rawError: true})
    async loadProfile(username: string) {
        const profile = await fetchProfile(username);
        return profile;
    }
}

export default getModule(UsersModule);