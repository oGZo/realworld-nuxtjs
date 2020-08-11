<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <template v-if="user && user.username == article.author.username">
      <a class="btn btn-outline-secondary btn-sm" @click="edit">
        <i class="ion-edit"></i> Edit Article
      </a>

      <button class="btn btn-outline-danger btn-sm" @click="del">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="followFun"
        :class="{
          active: !article.author.following,
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{article.author.following ? 'Unf' : 'F'}}ollow {{ article.author.username }}
        <span class="counter">({{ article.author.bio || 0 }})</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        @click="favoriteFun"
        :class="{
          active: !article.favorited,
        }"
      >
        <i class="ion-heart"></i>
        &nbsp; {{article.favorited ? 'Unf' : 'F'}}avorite Article
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addFavorite, deleteFavorite , delArticle } from '@/api/article';
import { follow, unFollow } from '@/api/follow';

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      favoriteDisabled: false,
      followDisabled: false,
    }
  },
  methods: {
    edit() {
      this.$router.push({
        path: '/editor',
        query: {
          slug:this.article.slug
        }
      })
    },
    async del() {
      await delArticle(this.article.slug);
      this.$router.push({
        path: `/profile/${this.article.author.username}`,
      })
    },
    async favoriteFun(){
      this.favoriteDisabled =  true;
      let { article } = this;
      let favoriteFn = article.favorited ? deleteFavorite : addFavorite;
      await favoriteFn(this.article.slug).then(() => {
        if(article.favorited){
          article.favoritesCount -= 1;
        }else {
          article.favoritesCount += 1;
        }
        article.favorited = !article.favorited;
      }).finally(() => {
        this.favoriteDisabled =  false;
      });
    },
    async followFun() {
      this.followDisabled =  true;
      let { author } = this.article;
      let followFun = author.following ? unFollow : follow;
      await followFun(author.username).then(() => {
        author.following = !author.following;
      }).finally(() => {
        this.followDisabled =  false;
      });
    }
  },
};
</script>

<style></style>
