import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Usuario } from "../../models/Usuario";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

  protected miUrl = 'http://localhost:9000/api/v1/usuario/';

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, public http: HttpClient) {
    super(http);
   }

  registerUser(email: string, pass: string){
    return new Promise((resolve, reject) =>{
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch( err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string){
    return new Promise((resolve, reject)=>{
      this.afsAuth.signInWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  loginGoogleUser(){
    return this.afsAuth.signInWithPopup( new auth.GoogleAuthProvider())
    .then(credential => this.updateUserData(credential.user))
  }

  logoutUser(){
    return this.afsAuth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user){
    const userRef : AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data : Usuario = {
      id: user.uid,
      email: user.email
    }
    return userRef.set(data, {merge:true})
  }

  isUserAdmin(userUid){
    return this.afs.doc<Usuario>(`users/${userUid}`).valueChanges();
  }

}