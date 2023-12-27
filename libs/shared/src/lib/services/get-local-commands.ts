export const getLocalCommand = (event: string) =>  {
    const command = event.trim().toLocaleLowerCase();
    if(command.includes("change language") || command.includes("cambiar idioma")) {
        return ({
            command: 'setLanguage',
            isLocalCommand: true
        })
    }
    if(command === "siguiente" || command === "next") {
        return ({
            command: 'next',
            isLocalCommand: true
        })
    }
    if(command === "anterior" || command === "back") {
        return ({
            command: 'back',
            isLocalCommand: true
        })
    }
    if(command === "save" || command === "salvar") {
        return ({
            command: 'save',
            isLocalCommand: true
        })
    }
    return ({
        command: '',
        isLocalCommand: false
    })
}

export enum LocalCommandTypes {
    SAVE = "save", 
    NEXT =  "next",
    BACK =  "back",
    SET_LANGUAGE = "setLanguage"
}