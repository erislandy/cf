import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private ValidUrlRegExp = new RegExp('^(http|https)://.+.svg$', 'i');

  private http = inject(HttpClient);
  getFeatherSvgContent(imageId: string): Observable<string> {
    return this.http.get(`./assets/css/feather/${imageId}.svg`, {
      responseType: 'text',
    });
  }
  isSvgUrl(url: string): boolean {
    //Check the string ends with .svg
    return this.ValidUrlRegExp.test(url);
  }
  getSvgDefault(): string {
    return svgDefault;
  }
}
const svgDefault = `<svg width="30" height="33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="226" height="223" fill="url(#pattern0)" />
<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" id="myCircle" />
<defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_339_42" transform="scale(0.00442478 0.0044843)" />
  </pattern>
</defs>
</svg>
`;