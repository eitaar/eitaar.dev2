<template>
  <div class="border-[1.5px] border-base-300 rounded-lg flex-2 shadow">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl font-bold font-Quantico text-center w-full link py-2">Github Stats</h1>
      <!-- stats -->
      <div class="flex flex-col gap-2 w-full h-full">
        <!-- stats -->
          <div class="flex flex-row justify-around items-center gap-2 w-full h-full">
            <div class="flex-1 h-full">
              <img alt="Top Langs" class="object-contain mx-auto" src="https://github-readme-stats.vercel.app/api?username=eitaar&hide_border=true&count_private=true&show_icons=true&bg_color=09090b&title_color=fafafa&text_color=a1a1aa&icon_color=fafafa"/>
            </div>
            <div class="flex-1 h-full">
              <img alt="github stats" class="object-contain mx-auto" src="https://github-readme-stats.vercel.app/api/top-langs/?username=eitaar&theme=transparent&hide_border=true&layout=compact&bg_color=09090b&title_color=fafafa&text_color=a1a1aa"/>
            </div>
          </div>
        <!-- snake -->
        <img src="https://raw.githubusercontent.com/eitaar/eitaar/output/github-contribution-grid-snake-dark.svg" v-if="isNightTheme" alt="GitHub Contribution Snake" class="flex-1 max-w-full"/>
        <img src="https://raw.githubusercontent.com/eitaar/eitaar/output/github-contribution-grid-snake.svg" v-else alt="GitHub Contribution Snake" class="flex-1 max-w-full"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const isNightTheme = ref(false);
onMounted(() => { 
  isNightTheme.value = document.documentElement.getAttribute('data-theme') === 'cndark';""

  const observer = new MutationObserver(() => {
    isNightTheme.value = document.documentElement.getAttribute('data-theme') === 'cndark';
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
