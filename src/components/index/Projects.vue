<template>
<div class="">
  <section class="splide">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide" v-for="project in projects" :key="project.id">
          <div class="card bg-base-100 shadow-xl image-full object-cover">
            <figure><img :src="project.image" alt="Project Image" class="object-contain"/></figure>
            <div class="card-body">
              <h2 class="card-title">{{ project.title }}</h2>
              <p>{{ project.description }}</p>
              <div class="card-actions justify-end">
                <button @click="openUrl(project.github)" class="btn btn-link text-neutral-content">GitHub</button>
                <button @click="openUrl(project.demo)" class="btn btn-secondary">Demo</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  github: string;
  demo: string;
}

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Personal Portfolio',
    description: 'My personal portfolio website showcasing my projects and skills. Built with mainly Astro and Tailwind CSS.',
    techStack: ['Astro', 'Vue.js', 'Tailwind CSS', 'DaisyUI', 'PixiJS','TypeScript'],
    image: "/eitaar_dev.png",
    github: 'https://github.com/eitaar/eitaar.dev',
    demo: 'https://eitaar.dev'
  },
  {
    id: 2,
    title: "Wahoot!",
    description: 'A third-party Kahoot! client without kahoot.js-latest. Built with Nuxt',
    techStack: ['Nuxt', 'Vue.js', 'JavaScript'],
    image: "/wahoot.png",
    github: "https://github.com/eitaar/Wahoot",
    demo: 'https://wahoot.eitaar.dev'
  }
]);

onMounted(() => {
  new Splide('.splide',{
    gap: '1vw',
  }).mount();
});

function openUrl(url:string) {
  window.open(url, '_blank');
}
</script>