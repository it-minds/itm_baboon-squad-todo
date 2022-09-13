import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class ButtonComponent implements OnInit {
	
  @Input() buttonConfig: any;
  constructor() {}

  @Output()
 onTextBtnClick(e: any) {};
  ngOnInit() {}
}