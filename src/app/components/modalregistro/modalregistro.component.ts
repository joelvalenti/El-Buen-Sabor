import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-modalregistro',
  templateUrl: './modalregistro.component.html',
  styleUrls: ['./modalregistro.component.css'],
})
export class ModalregistroComponent implements OnInit {
  // constructor(private fb: FirebaseService, private bs: BackendService) {}
  constructor(private fb: FirebaseService) {}
  ngOnInit() {}
  login(texto: string) {
    // this.bs.push();
    this.fb.login(texto);
  }
}
