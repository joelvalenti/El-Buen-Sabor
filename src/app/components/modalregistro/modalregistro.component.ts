import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RolesService } from '../../services/roles.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserInterface } from 'src/app/modelo/user';

@Component({
  selector: 'app-modalregistro',
  templateUrl: './modalregistro.component.html',
  styleUrls: ['./modalregistro.component.css']
})
export class ModalregistroComponent implements OnInit {

  constructor( private router: Router, private authService: UsuarioService, private serviciorol : RolesService,private storage: AngularFireStorage) { }

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;
  @ViewChild('imageUser',{static:true}) inputImageUser: ElementRef;
  //variables
  public email: string = '';
  public password: string = '';
  public password_repeat: string = '';
  public nombre:string = '';
  public apellido:string = '';
  public telefono:string = '';
  public fechaNacimiento:string = '';

  nuevoUsuario : UserInterface = {};

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit(): void {
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize (()=> this.urlImage = ref.getDownloadURL())).subscribe();

  }

  onAddUser(){
     this.authService.registerUser(this.email, this.password)
    .then( (res) => {
      this.authService.isAuth().subscribe( user =>{
        if(user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then( () => {
            
          }).catch( (error) => console.log('error',error));
        }
      });
      //codigo para agregar nuevo usuario
      this.nuevoUsuario.nombre = this.nombre;
      this.nuevoUsuario.Rol = 'cliente';
      this.nuevoUsuario.apellido = this.apellido;
      this.nuevoUsuario.email = this.email;
      this.nuevoUsuario.esCliente = true;
      //this.nuevoUsuario.fechaNacimiento = this.fechaNacimiento;
      this.nuevoUsuario.password = this.password;
      this.nuevoUsuario.telefono = Number.parseInt(this.telefono);
      
      this.serviciorol.post(this.nuevoUsuario).subscribe(
        res => { console.log('Todo bien', res)},
        err => {console.log('Todo mal', err)}
      );
      //end
      this.btnClose.nativeElement.click();
    }).catch ( (error) => console.log('err',error.message));
    
  }

  onLoginGoogle() : void {
    this.authService.loginGoogleUser()
    .then((res)=>{
      alert('Registrado con exito!');
      this.btnClose.nativeElement.click();
    }).catch(err => console.log('err',err.message));
    
  }

  onLoginRedirect(){
    this.router.navigate(['catalogo']);
  }
}
