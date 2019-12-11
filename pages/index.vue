<template>
  <section class="container">
    <div class="jumbotron">
      <h1>My Latest Posts</h1>
    </div>
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="p-3 mb-2 bg-secondary">
      <nuxt-link :to="post.fields.slug" class="text-white">{{ post.fields.title }}</nuxt-link>
    </div>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  asyncData({ env }) {
    return Promise.all([
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
    ]).then(([posts]) => {
      return {
        posts: posts.items
      }
    }).catch(console.error)
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A boilerplate for Nuxt projects. It includes Bootstrap | SCSS | JQuery.'
        }
      ]
    }
  },
  data() {
    return {
      title: 'Index'
    }
  },
  // asyncData() {
  //   // TODO: cache-management middleware handles the preloader, but good practice and to be used in the future

  //   // return new Promise((resolve) => {
  //   //   setTimeout(function() {
  //   //     resolve({})
  //   //   }, 1000)
  //   // })
  // },
  mounted() {
    this.$store.commit('base/SITE_LOADED')
  }
}
</script>

<style>

</style>
