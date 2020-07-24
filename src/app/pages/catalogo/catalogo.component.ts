import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelo/categoria';
import { Plato } from '../../modelo/plato';
import { PlatocategoriaService } from '../../services/platocategoria.service';
import { PlatoService } from '../../services/plato.service';

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
    this.platosCarrito.push(plato);
    this.total += plato.precioVenta;
    console.log('Pedido ', this.platosCarrito);
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
