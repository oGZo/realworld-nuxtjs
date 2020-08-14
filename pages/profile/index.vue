<template>
  <div class="profile-page">
    <div class="user-info" v-if="profile">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              v-if="user.username != profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="disabledFollow"
              @click="follow"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unf" : "F" }}ollow
              {{ profile.username }}
            </button>
            <nuxt-link
              ui-sref="app.settings"
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <nuxt-link
                class="nav-item"
                v-for="ta in tabs"
                :key="ta.name"
                :to="{
                  path: $route.path,
                  query: {
                    ...$route.query,
                    tab: ta.id,
                    page: 1,
                  },
                }"
              >
                <span class="nav-link" :class="{ active: ta.id == tab }">{{
                  ta.name
                }}</span>
              </nuxt-link>
            </ul>
          </div>

          <ArticleItem
            class="article-preview"
            v-for="(article, i) in articles"
            :article="article"
            :key="i"
          />
          <div class="col-md-3">
            <el-pagination
              v-if="totalPage > 1"
              :page-size="limit"
              layout="prev, pager, next"
              @current-change="pageChange"
              :total="articlesCount"
            >
            </el-pagination>
            <!-- <nav>
              <ul class="pagination" v-if="totalPage > 1">
                <li
                  class="page-item"
                  :class="{
                    active: item === page,
                  }"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                      path: $route.path,
                      query: {
                        ...$route.query,
                        page: item,
                      },
                    }"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/Article.vue";
import { getArticles } from "@/api/article";
import { getProfiles } from "@/api/profile";
import { follow, unFollow } from "@/api/follow";
import { mapState } from "vuex";

export default {
  middleware: "authenticated",
  name: "profile",
  components: {
    ArticleItem,
  },
  watchQuery: ["page", 'tab'],
  async asyncData({ query }) {
    let page = Number.parseInt(query.page) || 1;
    let limit = 5;
    let offset = (page - 1) * limit;
    let tab = query.tab || undefined;
    let param = {
      limit,
      offset,
      tab,
    };
    let getArticle =
      tab == "favorite"
        ? getArticles({ ...param, favorited: query.username })
        : getArticles({ ...param, author: query.username });
    let [{ data }, { data: articles }] = await Promise.all([
      getProfiles(query.username),
      getArticle,
    ]);
    console.log(data);
    return {
      tab,
      page,
      limit,
      offset,
      ...data,
      ...articles,
    };
  },
  data() {
    return {
      tabs: [
        {
          name: "My Articles",
          id: undefined,
        },
        {
          name: "Favorited Articles",
          id: "favorite",
        },
      ],
      disabledFollow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit) || 1;
    },
  },
  created() {
    if (this.user) {
      this.disabledFollow = this.user.username == this.profile.username;
    }
  },
  methods: {
    async follow() {
      if (this.disabledFollow) return;
      try {
        this.disabledFollow = true;
        if (this.profile.following) {
          await unFollow(this.profile.username);
        } else {
          await follow(this.profile.username);
        }
        this.profile.following = !this.profile.following;
      } catch (err) {
        console.log(err);
      } finally {
        this.disabledFollow = false;
      }
    },
    pageChange(page) {
      this.loadStatus = 0;
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          page,
        },
      });
    },
  },
};
</script>

<style></style>
