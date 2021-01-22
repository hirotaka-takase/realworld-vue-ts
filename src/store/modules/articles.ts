import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '@/store';
import { Article } from '../models';
import * as api from '@/store/api';
type FeedType = 'global' | 'user';

@Module({
    namespaced: true,
    dynamic: true,
    name: 'articles',
    store,
})
class ArticlesModule extends VuexModule {
    public feed: Article[] = [];

    @Mutation
    public setFeed(articles: Article[]) {
        this.feed = articles;
    }

    @Action({ commit: 'setFeed' })
    public async refreshFeed(feedType: FeedType) {
        const response = await api.getGlobalFeed();
        return response.articles;
    }
}

export default getModule(ArticlesModule);
