<template>
  <nav aria-label="Progress">
    <ol role="list" class="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
      <li v-for="(step, stepIdx) in steps" :key="step.id" class="relative md:flex-1 md:flex">
        <div v-if="getIndex(step) < currentIndex" class="group flex items-center w-full cursor-pointer" @click="$emit('update:modelValue', steps[stepIdx].id)">
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
              <CheckIcon class="w-6 h-6 text-white" aria-hidden="true" />
            </span>
            <span class="ml-4 text-sm font-medium text-gray-900">{{ step.name }}</span>
          </span>
        </div>
        <div v-else-if="getIndex(step) === currentIndex || dirty.includes(step.id)" :class="['w-full px-6 py-4 flex items-center text-sm font-medium', {'cursor-pointer': dirty.includes(step.id)}]" aria-current="step" @click="dirty.includes(step.id) ? $emit('update:modelValue', steps[stepIdx].id) : () => {}">
          <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
            <span class="text-indigo-600">{{ (stepIdx + 1) }}</span>
          </span>
          <span class="ml-4 text-sm font-medium text-indigo-600">{{ step.name }}</span>
        </div>
        <div v-else class="group flex items-center">
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
              <span class="text-gray-500 group-hover:text-gray-900">{{ (stepIdx + 1) }}</span>
            </span>
            <span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
          </span>
        </div>
        <template v-if="stepIdx !== steps.length - 1">
          <!-- Arrow separator for lg screens and up -->
          <div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
            <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
            </svg>
          </div>
        </template>
      </li>
    </ol>
  </nav>
      <div ref="container">
        <spacer />
        <slot />
    </div>
</template>

<script>
    import { CheckIcon } from '@heroicons/vue/solid'
    import Spacer from '@/Components/Spacer.vue'

    export default {
        emits: ['update:modelValue'],
        components: {
            CheckIcon,
            Spacer,
        },
        props: {
            modelValue: {
                type: String,
                required: true
            },
            steps: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                step: this.modelValue,
                dirty: [],
            }
        },
        mounted() {
            this.refreshVisibleContent()
        },
        computed: {
            currentIndex() {
                return this.getIndex({id: this.step})
            }
        },
        methods: {
            refreshVisibleContent() {
                this.$refs.container.querySelectorAll(':scope > [id]').forEach(c => {
                    c.getAttribute('id') === this.step
                        ? c.classList.remove('hidden')
                        : c.classList.add('hidden')
                })
            },
            getIndex(step) {
                return this.steps.findIndex(s => {
                    return s.id === step.id
                })
            },
        },
        watch: {
            step(value) {
                this.refreshVisibleContent()
                this.$emit('update:modelValue', value)

                if (! this.dirty.includes(value)) {
                    this.dirty.push(value)
                }
            },
            modelValue(value) {
                this.refreshVisibleContent()
                this.step = value
            }
        }
    }
</script>
