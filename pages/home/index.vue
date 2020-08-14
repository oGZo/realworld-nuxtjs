<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">realworld</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  ># {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <template v-if="articles && articles.length">
            <ArticleItem
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
              :article="article"
            />
          </template>
          <template v-else>
            <div v-if="loadStatus === 0">
              loading articles
            </div>
            <div v-else-if="loadStatus === 2">
              no articles
            </div>
          </template>

          <!-- 分页列表 -->
          <el-pagination
            v-if="totalPage > 1"
            :page-size="limit"
            layout="prev, pager, next"
            @current-change="pageChange"
            :total="articlesCount"
          >
          </el-pagination>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item,
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/Article.vue";
import {
  getArticles,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    ArticleItem,
  },
  data() {
    return {
      loadStatus: 0, // 0 加载中 1 正常情况  2  加载完成
    };
  },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 10;
    const tab = query.tab || "global_feed";
    const tag = query.tag;

    const loadArticles =
      tab === "global_feed"
        ? getArticles
        : tab == "tag"
        ? getArticles
        : getYourFeedArticles;

    const articleRes = await loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      })

    const { articles, articlesCount } = articleRes.data;
    let loadStatus = articles.length < limit ? 2 : 1;

    articles.forEach((article) => (article.favoriteDisabled = false));

    return {
      articles, // 文章列表
      articlesCount, // 文章总数
      limit, // 每页大小
      loadStatus,
      page, // 页码
      tab, // 选项卡
      tag, // 数据标签
    };
  },
  data() {
    return {
      tags: [],
    }
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  created() {
    this.getTags();
  },
  methods: {
    pageChange(page) {
      this.loadStatus = 0;
      this.$router.replace({
        name: "home",
        query: {
          ...this.$route.query,
          page,
        },
      });
    },
    async getTags() {
      let { data: { tags }} = await getTags();
      this.tags = tags;
    }
  },
};
</script>

<style></style>
