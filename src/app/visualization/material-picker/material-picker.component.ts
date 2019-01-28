import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-material-picker',
  templateUrl: './material-picker.component.html',
  styleUrls: ['./material-picker.component.scss']
})
export class MaterialPickerComponent implements OnInit {

  @Output() colorChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  chooseColor(colorId: string): void {
    this.colorChanged.emit(Number('0x' + colorId));
  }

}
