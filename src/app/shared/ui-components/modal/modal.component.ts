import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() modalCloseEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public modalClickHandler(event: any): void {
    if(event.target.classList[0] === 'io-garden-explanation' || event.target.classList[0] === 'modal-body') {
      return;
    }
    this.modalCloseEvent.emit('close');
  }

}
