import { Component, Input } from '@angular/core';
import { Finance } from '../../models/finance';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() valor!:Finance;
  @Input() conversoes!:Finance;
}
