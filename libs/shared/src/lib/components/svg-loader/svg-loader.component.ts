import { 
  Component, 
  ElementRef, 
  Input, 
  OnChanges, 
  Renderer2, 
  SimpleChanges, 
  inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'cf-svg-loader',
  standalone: true,
  templateUrl: './svg-loader.component.html',
  styleUrls: [ './svg-loader.component.scss' ]
})
export class SvgLoaderComponent implements OnChanges {
  svgContent!: SafeHtml;
  @Input({required: true}) imageId!: string;
  @Input() width = 18;
  @Input() height = 18;
  @Input() currentClass: string = 'text-gray-500'
  private imageService = inject(ImageService)
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private sanitizer = inject(DomSanitizer);   

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'imageId' ] && changes[ 'imageId' ].currentValue) {
      this.loadSvg(changes[ 'imageId' ].currentValue);
    }
    if (changes[ 'currentClass' ] && changes[ 'currentClass' ].currentValue) {
      this.currentClass = changes[ 'currentClass' ].currentValue;
    }
  }

  loadSvg(imageId: string): void {
    if (this.imageService.isSvgUrl(imageId)) {
      const split = imageId.split('/');
      imageId = split[ split.length - 1 ];
    }
    this.imageService.getFeatherSvgContent(imageId).subscribe(
      {
        next: data => {
          const dataWidthSizes = data.replace(/width="\d+"/, `width="${this.width}"`)
                                     .replace(/height="\d+"/, `height="${this.height}"`)
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(dataWidthSizes);
        },
        error: () => {
          this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.imageService.getSvgDefault());
        }
      }
    );
  }
}