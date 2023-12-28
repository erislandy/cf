import { Pipe, PipeTransform } from '@angular/core';

const translates = {
  'EN': {
    'Save': 'Save',
    'Next': 'Next',
    'Back': 'Back',
    'Change Language': 'Change Language',
    'Save the current routine':'Save the current routine',
    'Go to the next step in rountine': 'Go to the next step in rountine',
    'Go to the previous step in routine':'Go to the previous step in routine',
    'Change language of the application': 'Change language of the application',
    'Power off': 'Power off',
    'Power off the command voice button': 'Power off the command voice button',
    'Go to routines': 'Go to routines',
    'Go to the routines page':'Go to the routines page',
    'Go to commands': 'Go to commands',
    'Go to the commands page': 'Go to the commands page'
  },
  'ES': {
    'Save': 'Guardar',
    'Next': 'Siguiente',
    'Back': 'Atras',
    'Change Language': 'Cambiar Idioma',
    'Save the current routine': 'Guardar la rutina actual',
    'Go to the next step in rountine': 'Ir al siguiente paso en la rutina',
    'Go to the previous step in routine': 'Ir al paso anterior en la rutina',
    'Change language of the application': 'Cambiar el idioma de la aplicación',
    'Power off': 'Apagar',
    'Power off the command voice button': 'Apagar el botón de voz de comandos',
    'Go to routines': 'Ir a rutinas',
    'Go to the routines page': 'Ir a la página de rutinas',
    'Go to commands': 'Ir a comandos',
    'Go to the commands page': 'Ir a la página de comandos'

  }
};

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  
  transform(value: string, ...args: string[]): string {
    const newValue  = value as "Save" | "Next" | "Back" | "Change Language" | "Save the current routine" | "Go to the next step in rountine" | "Go to the previous step in routine" | "Change language of the application";
    console.log(args);
    const lang = args[0] as 'ES' | 'EN';
    // eslint-disable-next-line
    return translates[lang] && translates[lang][newValue] ? translates[lang][newValue] : '';

  }
}

