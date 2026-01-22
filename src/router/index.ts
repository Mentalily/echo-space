import {createRouter, createWebHistory} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import AnniversaryView from "@/views/AnniversaryView.vue";
import ChatView from "@/views/ChatView.vue";
import ContactView from "@/views/ContactView.vue";
import GalleryView from "@/views/GalleryView.vue";
import HomeView from "@/views/HomeView.vue";
import MemoView from "@/views/MemoView.vue";
import MusicView from "@/views/MusicView.vue";
import PeriodView from "@/views/PeriodView.vue";
import SettingsView from "@/views/SettingsView.vue";
import TomaView from "@/views/TomaView.vue";
import TypeWriterView from "@/views/TypeWriterView.vue";
import WalletView from "@/views/WalletView.vue";
import WishlistView from "@/views/WishlistView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/chat',
        component: ChatView,
    },
    {
        path: '/date',
        component: AnniversaryView,
    },
    {
        path: '/gallery',
        component: GalleryView,
    },
    {
        path: '/set',
        component: SettingsView,
    },
    {
        path: '/music',
        component: MusicView,
    },
    {
        path:'/memo',
        component: MemoView,
    },
    {
        path:'/toma',
        component: TomaView,
    },
    {
        path:'/period',
        component: PeriodView,
    },
    {
        path:'/writer',
        component: TypeWriterView,
    },
    {
        path:'/wish',
        component: WishlistView,
    },
    {
        path:'/wallet',
        component: WalletView,
    },
    {
        path:'/contact',
        component: ContactView,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL as string),
    routes,
})

export default router

/*
* createWebHistory()要不要传参数的问题
* 如果买了域名，`/`就是根目录问题不大咯
* 如果挂载到github.io上，那'/'目录是'/echo-space' 下的子目录，会有问题
* 于是为了健壮性，传参
* vite会读取 `vite.config.ts` 获取配置，设置BASE_URL*/