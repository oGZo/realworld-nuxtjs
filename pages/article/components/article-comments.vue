<template>
  <div>
    <form class="card comment-form" @submit.prevent="publish">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="comment.body"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, publishComments } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      disabled: false,
      comment: {
        body: ''
      },
      comments: [] // 文章列表
    }
  },
  async mounted () {
    this.getComments();
  },
  methods: {
    async publish() {
      this.disabled = true;
      try {
        let res = await publishComments(this.article.slug, this.comment)
        console.log(res);
        this.comments.unshift(res.data.comment);
      } catch (error) {
        console.log(error);
      }
      this.disabled = false;
    },
    async getComments() {
      const { data } = await getComments(this.article.slug)
    this.comments = data.comments
    }
  }
}
</script>

<style></style>
