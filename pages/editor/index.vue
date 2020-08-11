<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="publish">
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control " v-model="article.title" placeholder="Article Title" required>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" v-model="article.description" placeholder="What's this article about?" required>
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" v-model="article.body" placeholder="Write your article (in markdown)" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" v-model="article.tagList" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" >
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { publishArticle, getArticle, modifyArticle } from '@/api/article';
import { mapState } from 'vuex';

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return {
      slug: this.$route.query.slug,
      article: {
          "title": "",
          "description": "",
          "body": "",
          "tagList": []
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.init();
  },
  methods: {
    async publish() {
      if(this.slug ){
        await modifyArticle(this.slug, this.article);
      }else {
        const { data } = await publishArticle(this.article);
        this.slug = data.article.slug;
      }
      this.$router.replace({
        path: '/article?slug=' + this.slug
      })
    },
    init(){
      if(this.slug){
        this.getDetail();
      }
    },
    async getDetail() {
      const { data } = await getArticle(this.slug);
      const { article } = data;
      Object.keys(this.article).forEach(key => {
        this.article[key] = article[key];
      })
      console.log(data);
    }
  }
}
</script>

<style>

</style>
