import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { Article } from '../models';
import * as api from '@/store/api';

@Module({
    namespaced: true,
    dynamic: true,
    name: 'articles',
    store,
})
class ArticlesModule extends VuexModule {
    globalFeed: Article[] = [];
    userFeed: Article[] = [];

    @Mutation
    setGlobalFeed(articles: Article[]) {
        this.globalFeed = articles;
    }

    @Action({ commit: 'setGlobalFeed' })
    async refreshGlobalFeed() {
        const response = await api.getGlobalFeed();
        return response.articles;
    }
}

export default getModule(ArticlesModule);