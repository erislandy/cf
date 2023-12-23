import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { VoiceButtonStates, stateOrderAfterClick } from '../../models';
import { ActionContext, SpeechError, SpeechEvent, SpeechNotification, SpeechRecognizerService, defaultLanguage, languages } from '@engadi-solutions/web-speech';
import { Observable, Subject, map, merge, of, tap } from 'rxjs';

@Component({
  selector: 'cf-voice-manager',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './voice-manager.component.html',
  styleUrl: './voice-manager.component.scss',
})
export class VoiceManagerComponent implements OnInit {
 
  @Input() state: VoiceButtonStates = VoiceButtonStates.INACTIVE;
  @Output() stateChanged: EventEmitter<VoiceButtonStates> = new EventEmitter<VoiceButtonStates>();

  /**Speech properties */
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage;
  totalTranscript?: string;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  /**End Speech properties */
  
  
  speechRecognizer = inject(SpeechRecognizerService);
  actionContext = inject(ActionContext);

  ngOnInit(): void {
    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }
  }

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  selectLanguage(language: string): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
    }
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  stateChangedHandler(oldState: VoiceButtonStates) {
    console.log('stateChangedHandler: ', oldState);
    this.state = stateOrderAfterClick[oldState as keyof typeof stateOrderAfterClick];
    this.stateChanged.emit(this.state);    

    if (this.state === VoiceButtonStates.ACTIVE) {
      this.start();
    } else if (this.state === VoiceButtonStates.LOADING) {
      this.stop();
    }
  }
  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript
        ? `${this.totalTranscript}\n${message}`
        : notification.content;
    }
  }
}



