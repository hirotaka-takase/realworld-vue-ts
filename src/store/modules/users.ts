import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Profile, User, UserSubmit } from '../models';
import { loginUser } from '../api';
  
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

    get username() {
        return this.user || null;
    }

    @Action({commit: 'setUser'})
    async login(userSubmit: UserSubmit) {
       const user = await loginUser(userSubmit);
       return user;
    }
}

export default getModule(UsersModule);