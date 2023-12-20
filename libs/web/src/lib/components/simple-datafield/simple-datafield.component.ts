import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFieldCommand } from '../../ui-models';
import { SvgLoaderComponent } from '@cf/shared';

@Component({
  selector: 'cf-simple-datafield',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './simple-datafield.component.html',
  styleUrl: './simple-datafield.component.scss',
})
export class SimpleDatafieldComponent {
  @Input({required: true}) dataField!: DataFieldCommand;
}
