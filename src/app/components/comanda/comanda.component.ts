import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css'],
})
export class ComandaComponent implements OnInit {
  @Input() comanda;
  constructor() {}

  ngOnInit(): void {}
}
