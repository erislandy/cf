import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFieldCommand } from '../../ui-models';
import { SvgLoaderComponent } from '@cf/shared';

@Component({
  selector: 'cf-group-datafield',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './group-datafield.component.html',
  styleUrl: './group-datafield.component.scss',
})
export class GroupDatafieldComponent {
  @Input({required: true}) dataField!: DataFieldCommand;
}
