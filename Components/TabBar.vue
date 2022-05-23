<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
        <option v-for="tab in tabs" :key="tab.value" :selected="tab.value === value">{{ tab.text }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
        <div v-for="(tab, tabIdx) in tabs" :key="tab.value" @click="value = tab.value" :class="[tab.value === value ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10']" :aria-current="tab.value === value ? 'page' : undefined">
          <span>{{ tab.text }}</span>
          <span aria-hidden="true" :class="[tab.value === value ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        emits: ['update:modelValue'],
        props: {
            modelValue: {
                type: String,
                default: null
            },
            tabs: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                value: this.modelValue
                    ? this.modelValue
                    : this.tabs.length > 0 ? this.tabs[0] : ''
            }
        },
        watch: {
            modelValue(value) {
                this.value = value
            },
            value(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
</script>
