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
    'Change language of the application': 'Change language of the application'
  },
  'ES': {
    'Save': 'Guardar',
    'Next': 'Siguiente',
    'Back': 'Atras',
    'Change Language': 'Cambiar Idioma',
    'Save the current routine': 'Guardar la rutina actual',
    'Go to the next step in rountine': 'Ir al siguiente paso en la rutina',
    'Go to the previous step in routine': 'Ir al paso anterior en la rutina',
    'Change language of the application': 'Cambiar el idioma de la aplicación'
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

