export enum VoiceButtonStates {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    LOADING = 'loading',
    TALKING = 'talking'
}

export const stateOrderAfterClick = {
    active: VoiceButtonStates.LOADING,
    inactive: VoiceButtonStates.ACTIVE,
    talking: VoiceButtonStates.LOADING,
}
