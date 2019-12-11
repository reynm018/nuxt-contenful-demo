<template>
  <section class="container">
    <div class="jumbotron">
      <h1>{{ posts.fields.title }}</h1>
    </div>
    <div><nuxt-link to="/">Go Back Home</nuxt-link></div>
    <hr>
    <p>{{ posts.fields.content }}</p>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  asyncData({ env }) {
    return Promise.all([
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID
      })
    ]).then(([posts]) => {
      return {
        posts: posts.items[0]
      }
    }).catch(console.error)
  },
  head() {
    return {
      title: this.posts.fields.title
    }
  },
  mounted() {
    this.$store.commit('base/SITE_LOADED')
  }
}
</script>

<style>

</style>
