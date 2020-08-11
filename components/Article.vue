<template>
  <div class="article-preview" v-if="article.author">
    <div class="article-meta">
      <nuxt-link
        :to="{
          path: `/profile?username=${article.author.username}`,
        }"
      >
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <nuxt-link
          class="author"
          :to="{
            path: `/profile?username=${article.author.username}`,
          }"
        >
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{
          active: article.favorited,
        }"
        @click="onFavorite(article)"
        :disabled="favoriteDisabled"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link
      class="preview-link"
      :to="{
        path: `/article?slug=${article.slug}`,
      }"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="tag in article.tagList"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
    </nuxt-link>
  </div>
</template>
<script>
import { addFavorite, deleteFavorite } from "@/api/article";

export default {
  props: {
    article: {
      type: Object,
    },
  },
  data() {
    return {
      favoriteDisabled: false,
    };
  },
  methods: {
    async onFavorite(article) {
      this.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      this.favoriteDisabled = false;
    },
  },
};
</script>
