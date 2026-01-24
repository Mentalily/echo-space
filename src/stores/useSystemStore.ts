import { defineStore } from 'pinia'
import {computed, ref} from 'vue'


// 我快死过去了，谁来救救这个小白
// 谁来管管……我真要恨你了TS
export interface UserProfile {
    id: string
    name: string
    status: string
    // wallpaper: string
    // apps: string[]  // 可能App列表（头秃中）
}

type PerspectiveKeys = 'I' | 'U'

const useSystemStore = defineStore('system', () => {
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