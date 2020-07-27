import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelo/categoria';
import { Plato } from '../../modelo/plato';
import { PlatocategoriaService } from '../../services/platocategoria.service';
import { PlatoService } from '../../services/plato.service';
import { Detalle } from 'src/app/modelo/detalle';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  vcategoria : string = null;
  public categorias : Categoria[];
  public platos : Plato[];
  public platosCarrito : Plato[] = [];
  total: number = 0;
  platoDetalle : Plato = {} ;
  //variables pedido
  carritoFinal : Detalle[] = [];


  constructor(private servicioCategoria : PlatocategoriaService, private servicioPlato : PlatoService ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  volverANulo(){
    this.vcategoria = null;
  }

  getCategorias(){
    this.servicioCategoria.getAll().subscribe(res =>{
      this.categorias = res;
    }, err => {
      alert('Error al traer categorias');
    });
  }

  elegirCategoria(categoria:string){
     this.vcategoria = categoria;
     console.log('categoria: ', this.vcategoria);
     this.servicioPlato.getByCategory(categoria).subscribe(res =>{
      this.platos = res;
    }, err => {
      alert('Error al traer categorias');
    });
  }

  agregarAlPedido( plato : Plato){
    let nuevoDetalle : Detalle = {};
    if (this.carritoFinal.length < 1){
      nuevoDetalle.plato = plato;
      console.log('DETALLE PLATO ', nuevoDetalle.plato);
      nuevoDetalle.cantidad = 1 ;
      this.carritoFinal.push(nuevoDetalle);
      this.total += plato.precioVenta;
      console.log('carrito final 1', this.carritoFinal);
    }else{
      let otro : Detalle = {};
      otro.plato = plato;
      const indice =  this.carritoFinal.findIndex(ref => ref.plato.nombre == otro.plato.nombre);
      if( indice != null ){
        this.carritoFinal[indice].cantidad++;
        console.log('carrito final 2', this.carritoFinal);
      }else{
        let nuevo : Detalle = {};
        nuevo.plato = plato;
        console.log('DETALLE PLATO ', nuevo.plato);
        nuevo.cantidad = 1 ;
        this.carritoFinal.push(nuevo);
        this.total += plato.precioVenta;
        nuevo = {};
        console.log('carrito final 3', this.carritoFinal);
      }
    }
  }

  eliminarItem(plato : Plato ){
    const indexPlato = this.platosCarrito.indexOf(plato);
    this.platosCarrito.splice(indexPlato, 1);
    this.total =  this.total - plato.precioVenta;
  }
  enviarPedido(){
    console.log('pedido final ',this.platosCarrito);
  }

  verDetalle(plato: Plato){
    this.platoDetalle = plato;
  }
}
