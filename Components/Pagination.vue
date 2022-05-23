<template>
  <div class="flex items-center justify-between">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#" @click="previousPage()" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Previous
      </a>
      <a href="#" @click="nextPage()" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Next
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ meta.from }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ meta.to }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ meta.total }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div v-show="pages > 1">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <div @click="previousPage()" class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </div>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <div v-for="n in sequence" :key="n" @click="changePage(n)" aria-current="page" :class="[n === page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50', 'cursor-pointer hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium']">
            {{ n }}
          </div>
          <div @click="nextPage()" class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
      api: {
        type: Object,
        required: true
      }
  },
  computed: {
    meta() {
      return this.api.meta()
    },
      page() {
            return this.meta.current_page
        },
        lastPage() {
            return this.meta.last_page
        },
        isFirstPage() {
            return this.page === 1
        },
        isLastPage() {
            return this.page === this.lastPage
        },
        pages() {
            return this.meta.total === 0 ? 0 : Math.ceil(this.meta.total / this.meta.per_page)
        },
        sequence() {
          let from = Math.max(1, this.page - 7);
          let to = Math.min(this.pages, this.page + 7);
          let n = []

          for (let i = from; i <= to; i++) {
            n.push(i)
          }
          return n
        }
  },
  methods: {
      changePage(change) {
          this.api.goTo(change)
        },
        nextPage() {
          if (this.isLastPage) {
            return
          }
          this.changePage(this.page + 1)
        },
        previousPage() {
          if (this.isFirstPage) {
            return
          }
          this.changePage(this.page - 1)
        }
  },
}
</script>