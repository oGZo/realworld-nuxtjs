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
                <el-select v-model="article.tagList" multiple placeholder="Enter tags" class="form-control" >
                  <el-option v-for="tag in allTag" :key="tag" v-if="tag && tag.trim()" :value="tag" :label="tag" />
                </el-select>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" :disabled="disabled">
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
import { getTags } from '@/api/tag';

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data() {
    return {
      disabled: false,
      slug: this.$route.query.slug,
      allTag: [],
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
      const { article } = this;
      this.disabled = true;
      if(this.slug ){
        await modifyArticle(this.slug, { article} );
      }else {
        const { data } = await publishArticle({article});
        this.slug = data.article.slug;
      }
      this.disabled = false;
      this.$router.replace({
        path: '/article?slug=' + this.slug
      })
    },
    init(){
      if(this.slug){
        this.getDetail();
      }
      this.getTags();
    },
    async getTags() {
      const { data: { tags } } = await getTags();
      this.allTag = tags.reverse();
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
