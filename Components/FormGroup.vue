<template>
  <div>
    <div class="md:grid md:grid-cols-4 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
              {{ title }}
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            <slot name="info" />
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-3">
          <panel>
              <div class="space-y-2">
                  <slot />
              </div>
          </panel>
      </div>
    </div>
  </div>
</template>

<script>
    import Panel from '@/Components/Panel.vue'

    export default {
        components: {
            Panel,
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>