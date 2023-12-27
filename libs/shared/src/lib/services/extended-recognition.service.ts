import { Injectable, NgZone, inject } from '@angular/core';
import { SPEECH_RECOGNITION } from '@ng-web-apis/common';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExtendedRecognitionService extends Observable<SpeechRecognitionResult[]> {
  private initialLang: string = 'es-ES';
  // eslint-disable-next-line
  speechRecognition: any;
  _subscriber : Subscriber<SpeechRecognitionResult[]> = new Subscriber();

  classRef = inject(SPEECH_RECOGNITION);
  ngZone = inject(NgZone);
  constructor() {
    super((subscriber) => {
      this._subscriber = subscriber;  
      this.initSpeechRecognition(subscriber, this.initialLang);
    });
  }
  private initSpeechRecognition(subscriber: Subscriber<SpeechRecognitionResult[]>, lang: string) {
    if (!this.classRef) {
      subscriber.error(new Error('SpeechRecognition is not supported'));
      return;
    }

    this.speechRecognition = new this.classRef();
    this.speechRecognition.lang = lang
    this.speechRecognition.maxAlternatives = 3;
    this.speechRecognition.interimResults = true;
   
    // eslint-disable-next-line
    this.speechRecognition.onerror = (error: any) => subscriber.error(error);
    this.speechRecognition.onend = () => subscriber.complete();
    // eslint-disable-next-line
    this.speechRecognition.onresult = (data: any) =>
      this.ngZone.run(() =>
        subscriber.next(
          Array.from({ length: data.results.length }, (_, i) => data.results[i])
        )
      );

      this.speechRecognition.start();

    return () => this.speechRecognition.abort();
  }
  changeLanguage(): void {
      const newLang = this.speechRecognition.lang === 'es-ES' ? 'en-US' : 'es-ES';
        if (this.speechRecognition) {
            this.speechRecognition.abort();
            this.initSpeechRecognition(this._subscriber, newLang);
        }
  }
  stop(): void {
    if (this.speechRecognition) {
      this.speechRecognition.abort();
      this._subscriber.unsubscribe();
    }
  }
}
