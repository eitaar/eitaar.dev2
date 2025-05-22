<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <div v-for="post in posts" :key="post.id" class="card card-border bg-base-100 shadow-md">
      <figure v-if="post.data.image">
        <img :src="post.data.image" :alt="post.data.title" class="w-full h-30 lg:h-48 object-contain pt-4" />
      </figure>
      <figure v-else class="w-full h-30 lg:h-48 object-contain flex items-center justify-center">
        <slot name="noImage"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title text-primary">
          {{ post.data.title }}
        </h2>
        <p class="text-base-content">
          {{ post.data.description }}
        </p>
        <div class="flex flex-row flex-wrap gap-2">
          <span v-for="tag in post.data.tags" :key="tag" class="badge badge-accent">
            {{ tag }}
          </span>
        </div>
        <div class="card-actions justify-end">
          <a :href="`/articles/${post.slug}`" class="btn btn-secondary btn-sm">
            詳細を見る
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 型定義
interface Post {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    date: Date;
    image?: string;
  };
}

// definePropsに型を指定
const { posts } = defineProps<{ posts: Post[] }>();
</script>