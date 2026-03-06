import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { supabase } from '@/supabase'

export interface ProfileConfig {
    theme: {                // 主题设置
        // 壁纸
        wallpaper: string;  // 桌面壁纸
        lockscreen: string; // 锁屏壁纸
        motto: string;      // 锁屏小字

        // 字体
        fontFamily: string; // CSS用的字体名
        fontUrl?: string;   // 字体文件的下载链接
        fontSize: number;   // 设置字号

        // 磨砂
        maskOpacity: number;// 遮罩透明度：磨砂深浅
    };
    apps: Array<{           // 应用设置
        id: string;         // 默认设置
        name: string;       // 自定义应用名称
        icon: string;       // 自定义应用图标（上传图片完全覆盖，默认是磨砂底+png图标）
        order: number;      // 应用顺序（控制布局）
        isEnable: boolean;  // 是否启用（是否添加到桌面）
    }>;
    anniversaries: Array<{  // 纪念日数据
        id: string;         // 随机ID：方便删除
        title: string;      // 纪念日名称
        date: string;       // 纪念日日期：格式形如"2024-09-15"
        isTop: boolean;     // 是否置顶在桌面（纪念日小组件）
        bgImage?: string;   // (可选) 如果有图就显示图，没图就显示默认磨砂
    }>;
    contacts: Array<{       // 联系人（目前仅支持单机）
        name: string;       // 联系人姓名
        remark?: string;    // (可选) 联系人备注
        isStarred: boolean; // 是否星标
        avatar: string;     // 默认是系统图标
        // 详情页展示（avatar上传会作为证件照
        id: string;         // 可以自行设置ID：UI类似ID Card
        birthday: string;   // 文字描述生日：比如 三月初三
        bio: string;        // 描述性文字
        org: string;        // (可选) 组织
    }>;
    deskPet: {              // 桌宠设置
        isEnable: boolean;  // 是否启用
        // 考虑中
        // 触发条件有两种：点击/定时（根据日子时间）
        // 点击-问候（早安午安）/累了吗/我也在想你
        // 或者是从心愿单里：我在想关于去xx的事
        // 时间-生理期的提醒/夜间催睡觉
        // 文字是自行设置的，可以根据文案上传动图，或者只上传一张图片
        // 背景图上传：可以是环境（房间）也可以是简单含人物的动图
        // 人物图（可选上传）
        // 上传多图，可以设置放映条件
    }
}

export interface UserProfile {
    id: string          // id: I/U 区分是本人视角还是对面视角
    name: string        // name: 名字可以修改
    status: string      // status: 状态，可选择emoji
    wallpaper: string   // wallpaper: 壁纸
    // lockscreen: string
    // apps: string[]  // 可能App列表（头秃中）
}

type PerspectiveKeys = 'I' | 'U'

const useSystemStore = defineStore('system', () => {

    // 先实现本地版，再使用云端数据库

    // 简单模拟一下逻辑，后续再调整
    // const syncUserConfig = async () => {
        // 获取当前用户
        // const { data: {user} } = await supabase.auth.getUser()
        // if (!user) return

        // const { data } = supabase.storage
        //     .from('settings')
        //     .getPublicUrl(`${user.id}/wallpaper-me.jpg`)
    // }

    // 简单登录状态管理
    const isLoggedIn = ref(false)
    const toggleLogin = () => {
        isLoggedIn.value = !isLoggedIn.value
    }

    // 双视角管理
    const currentPerspectiveID = ref<'I' | 'U'>('I')
    const profiles = ref<Record<PerspectiveKeys, UserProfile>>({
        I: {
            id: 'I',
            name: '我',
            status: '🙂',
            wallpaper: '',
        },
        U: {
            id: 'U',
            name: '你',
            status: '🙂',
            wallpaper: ''
        }
    })

    // 获取当前视角的所有数据
    const currentProfile = computed((): UserProfile => {
        return profiles.value[currentPerspectiveID.value] || profiles.value['I']
    })

    // 切换视角
    const togglePerspective = () => {
        currentPerspectiveID.value = currentPerspectiveID.value === 'I' ? 'U' : 'I'
    }

    // 更新状态
    const updateStatusEmoji = (emoji: string) => {
        profiles.value[currentPerspectiveID.value].status = emoji
    }

    // 更新壁纸
    const updateWallpaper = (base64Url: string) => {
        profiles.value[currentPerspectiveID.value].wallpaper = base64Url
    }

    return {
        isLoggedIn,
        toggleLogin,
        currentPerspectiveID,
        currentProfile,
        togglePerspective,
        updateStatusEmoji,
        updateWallpaper
    }
})

export default useSystemStore