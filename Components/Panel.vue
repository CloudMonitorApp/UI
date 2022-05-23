<template>
  <div class="bg-white overflow-visible shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <slot />
    </div>
  </div>
  <spacer />
</template>

<script>
  import Spacer from '@/Components/Spacer.vue'
  
    export default {
        components: {
          Spacer,
        }
    }
</script>