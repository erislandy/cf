export enum VoiceButtonStates {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCK = 'block',
    TALKING = 'talking'
}

export const stateOrderAfterClick = {
    active: VoiceButtonStates.INACTIVE,
    inactive: VoiceButtonStates.ACTIVE
}
