import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public usuario: any = {};

  constructor(public aut: AngularFireAuth) {
    this.aut.authState.subscribe((user) => {
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.aut.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.aut.signInWithPopup(new auth.EmailAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.aut.signOut();
  }
}
