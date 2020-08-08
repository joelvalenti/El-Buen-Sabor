import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../modelo/categoria';
import { Plato } from '../../modelo/plato';
import { PlatocategoriaService } from '../../services/platocategoria.service';
import { PlatoService } from '../../services/plato.service';
import { InsumoService } from '../../services/insumo.service';
import { Detalle } from 'src/app/modelo/detalle';
import { Insumo } from 'src/app/modelo/Insumo';

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
  gaseosas : Insumo[] = [];
  total: number = 0;
  platoDetalle : Plato = {} ;
  seleccionBebidas : boolean = false;
  //variables pedido
  @Output() envioPedido:EventEmitter<Object> = new EventEmitter<Object>();
  carritoFinal : Detalle[] = [];
  carritoBebidas : Detalle[] = [];


  constructor(private servicioCategoria : PlatocategoriaService,
               private servicioPlato : PlatoService,
               private servicioBebida : InsumoService ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  volverANulo(){
    this.vcategoria = null;
  }

  getBebidas(){
    this.seleccionBebidas = true;
    this.servicioBebida.getEsInsumo(false).subscribe(res =>{
      this.gaseosas = res;
    }, err =>{
      console.log('Error al traer bebidas');
    });
  }

  getCategorias(){
    this.servicioCategoria.getAll().subscribe(res =>{
      this.categorias = res;
    }, err => {
      alert('Error al traer categorias');
    });
  }

  elegirCategoria(categoria:string){
    this.seleccionBebidas = false;
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
      nuevoDetalle.cantidad = 1 ;
      this.carritoFinal.push(nuevoDetalle);
      this.total += plato.precioVenta;
      console.log('carrito final 1', this.carritoFinal);
    }else{
      let otro : Detalle = {};
      otro.plato = plato;
      const indice =  this.carritoFinal.findIndex(ref => ref.plato.nombre == otro.plato.nombre);
      console.log(indice);
        if(indice < 0){
          let nuevoPlato : Detalle = {};
          nuevoPlato.plato = plato;
          nuevoPlato.cantidad = 1;
          this.carritoFinal.push(nuevoPlato);
          this.total += plato.precioVenta;
          const nuevoIndice = this.carritoFinal.findIndex(ref => ref.plato.nombre == otro.plato.nombre);
        }else {
          this.carritoFinal[indice].cantidad++;
          this.total += plato.precioVenta;
        }
    }
  }

  agregarGaseosa(bebida){
    let nuevoDetalle : Detalle = {};
    if (this.carritoBebidas.length < 1){
      nuevoDetalle.insumo = bebida;
      nuevoDetalle.cantidad = 1 ;
      this.carritoBebidas.push(nuevoDetalle);
      this.total += bebida.precioVenta;
      console.log('carrito final 1', this.carritoBebidas);
    }else{
      let otro : Detalle = {};
      otro.insumo = bebida;
      console.log(otro.insumo.nombre);
      const indice =  this.carritoBebidas.findIndex(ref => ref.insumo.nombre == otro.insumo.nombre);
      console.log(indice);
        if(indice < 0){
          let nuevoPlato : Detalle = {};
          nuevoPlato.insumo = bebida;
          nuevoPlato.cantidad = 1;
          this.carritoBebidas.push(nuevoPlato);
          this.total += bebida.precioVenta;
          const nuevoIndice = this.carritoBebidas.findIndex(ref => ref.insumo.nombre == otro.insumo.nombre);
        }else {
          this.carritoBebidas[indice].cantidad++;
          this.total += bebida.precioVenta;
        }
    }
  }

  eliminarItem( detalle : Detalle ){
    if(detalle.plato != null){
        const nombreplato = detalle.plato.nombre;
        const indexPlato = this.carritoFinal.findIndex(ref => ref.plato.nombre == nombreplato);
      if(this.carritoFinal[indexPlato].cantidad > 1){
          this.carritoFinal[indexPlato].cantidad--;
          this.total =  this.total - detalle.plato.precioVenta;
      }else{
          this.carritoFinal.splice(indexPlato, 1);
          this.total =  this.total - detalle.plato.precioVenta;
      }
    }else if(detalle.insumo != null){
      const nombre = detalle.insumo.nombre;
      const index = this.carritoBebidas.findIndex(ref => ref.insumo.nombre == nombre);
        if(this.carritoBebidas[index].cantidad > 1){
        this.carritoBebidas[index].cantidad--;
        this.total =  this.total - detalle.insumo.precioVenta;
        }else{
        this.carritoBebidas.splice(index, 1);
        this.total =  this.total - detalle.insumo.precioVenta;
    }
    }
    
  }

  enviarPedido(){
    console.log('pedido final ',this.carritoFinal);
    console.log('bebidas',this.carritoBebidas);
    this.envioPedido.emit({
      comida: this.carritoFinal,
      bebidas: this.carritoBebidas
    });
  }

  verDetalle(plato: Plato){
    this.platoDetalle = plato;
  }
}
