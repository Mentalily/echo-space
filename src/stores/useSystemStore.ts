import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { supabase } from '@/supabase'

export interface UserProfile {
    id: string
    name: string
    status: string
    // wallpaper: string
    // apps: string[]  // 可能App列表（头秃中）
}

type PerspectiveKeys = 'I' | 'U'

const useSystemStore = defineStore('system', () => {

    // 简单模拟一下逻辑，后续再调整
    const syncUserConfig = async () => {
        // 获取当前用户
        const { data: {user} } = await supabase.auth.getUser()
        if (!user) return

        const { data } = supabase.storage
            .from('settings')
            .getPublicUrl(`${user.id}/wallpaper-me.jpg`)
    }

    const currentPerspectiveID = ref<'I' | 'U'>('I')
    const profiles = ref<Record<PerspectiveKeys, UserProfile>>({
        I: {
            id: 'I',
            name: '我',
            status: '🙂',
        },
        U: {
            id: 'U',
            name: '你',
            status: '🙂',
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

    return {
        currentPerspectiveID,
        currentProfile,
        togglePerspective,
        updateStatusEmoji,
    }
})

export default useSystemStore