import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonConfiguration } from 'src/app/models/button-config.model';


@Component({
  selector: 'app-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class ButtonComponent implements OnInit {
	
  @Input() buttonConfig? : ButtonConfiguration;
  constructor() {}

  @Output()
 	onTextBtnClick=new EventEmitter();
  ngOnInit() {}
}