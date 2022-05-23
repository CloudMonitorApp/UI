<template>
    <button
            v-if="disabled"
            type="button"
            disabled
            readonly
            :href="href"
            :class="buttonCSS"
            :preserve-state="href === '#'"
            :preserve-scroll="href === '#'">
        <i :class="[icon, 'p-1']" />
    </button>
    <template v-else>
        <Link
                v-if="href"
                :href="href"
                :class="buttonCSS"
                :preserve-state="href === '#'"
                :preserve-scroll="href === '#'">
            <i :class="[icon, 'p-1']" />
        </Link>
        <button
                v-else
                type="button"
                :class="buttonCSS">
            <i :class="[icon, 'p-1']" />
        </button>
    </template>
</template>

<script>
    import Button from '@/Components/Mixins/Button.js'
    
    export default {
        mixins: [Button],
        props: {
            icon: {
                type: String,
                required: true
            }
        },
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
                        xs: 'inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-'+color +'-600 hover:bg-'+color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+color +'-500',
                        sm: 'inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-'+color +'-600 hover:bg-'+color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+color +'-500',
                        base: 'inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-'+color +'-600 hover:bg-'+color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+color +'-500',
                        lg: 'inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-'+color +'-600 hover:bg-'+color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+color +'-500',
                        xl: 'inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-'+color +'-600 hover:bg-'+color +'-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+color +'-500',
                    },
                    secondary: {
                        xs: 'inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        sm: 'inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        base: 'inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        lg: 'inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        xl: 'inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-'+ color +'-700 bg-'+ color +'-100 hover:bg-'+ color +'-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                    },
                    outline: {
                        xs: 'inline-flex items-center p-1 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        sm: 'inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        base: 'inline-flex items-center p-2 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        lg: 'inline-flex items-center p-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                        xl: 'inline-flex items-center p-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-'+ color +'-500',
                    }
                }
            },
        }
    }
</script>