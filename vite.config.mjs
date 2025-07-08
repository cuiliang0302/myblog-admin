// @ts-ignore
import {resolve} from "path";
import vue from "@vitejs/plugin-vue";
import {defineConfig} from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src")
        }
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        VueSetupExtend()
    ],
    build: {
        terserOptions: {
            compress: {
                //生产环境时移除console
                // drop_console: process.env.VITE_DROP_CONSOLE,
                // drop_debugger: process.env.VITE_DROP_DEBUGGER
            },
        },
        minify: 'terser'
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    base:'/static/dist/'
});
