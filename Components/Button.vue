<template>
    <button
            v-if="disabled"
            type="button"
            disabled
            readonly
            :href="href"
            :class="[buttonCSS, {'cursor-not-allowed bg-opacity-50 hover:bg-opacity-75': disabled}]"
            :preserve-state="href === '#'"
            :preserve-scroll="href === '#'">
        <slot />
    </button>
    <template v-else>
        <Link
                v-if="href"
                :href="href"
                :class="[buttonCSS, {'cursor-not-allowed bg-opacity-50 hover:bg-opacity-75': disabled}]"
                :preserve-state="href === '#'"
                :preserve-scroll="href === '#'">
            <slot />
        </Link>
        <button
                v-else
                type="button"
                :class="[buttonCSS, {'cursor-not-allowed bg-opacity-50 hover:bg-opacity-75': disabled}]">
            <slot />
        </button>
    </template>
</template>

<script>
    import Button from '@/Components/Mixins/Button.js'
    
    export default {
        mixins: [Button],
        methods: {
            buttonClasses(color) {
                let forceLoad = [
                    'text-indigo-700',
                    'text-red-700',
                    'text-green-700',

                    'bg-indigo-100',
                    'bg-red-100',
                    'bg-green-100',

                    'bg-indigo-600',
                    'bg-red-600',
                    'bg-green-600',

                    'hover:bg-indigo-200',
                    'hover:bg-red-200',
                    'hover:bg-green-200',

                    'hover:bg-indigo-700',
                    'hover:bg-red-700',
                    'hover:bg-green-700',

                    'focus:ring-indigo-500',
                    'focus:ring-red-500',
                    'focus:ring-green-500',
                ]

                return {
                    primary: {
                        xs: 'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-'+ color +'-600 hover:bg-'+ color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        sm: 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-'+ color +'-600 hover:bg-'+ color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        base: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-'+ color +'-600 hover:bg-'+ color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        lg: 'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-'+ color +'-600 hover:bg-'+ color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        xl: 'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-'+ color +'-600 hover:bg-'+ color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                    },
                    secondary: {
                        xs: 'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        sm: 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        base: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        lg: 'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        xl: 'inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                    },
                    outline: {
                        xs: 'inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        sm: 'inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        base: 'inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        lg: 'inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        xl: 'inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                    }
                }
            },
        }
    }
</script>