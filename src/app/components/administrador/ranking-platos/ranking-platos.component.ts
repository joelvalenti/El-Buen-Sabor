import { RankingPlatosService } from './../../../services/allServices/rankingPlatos.service';
import { ModalPlatoComponent } from './../modales/modal-plato/modal-plato.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Plato } from '../../../models/Plato';
import Swal from'sweetalert2';
import { DetallePlato } from 'src/app/models/DetallePlato';

@Component({
  selector: 'app-ranking-platos',
  templateUrl: './ranking-platos.component.html',
  styleUrls: ['./ranking-platos.component.css']
})
export class RankingPlatosComponent implements OnInit {


  public displayedColumns: string[] = ['id','cantidadVendida','nombre' ];
  public dataSource: MatTableDataSource<Plato> = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public sidenavOpened: boolean = false;
  public platoSeleccionado : Plato = null;


  constructor(public dialog: MatDialog, public service: RankingPlatosService) { }


  ngOnInit(): void {
    this.traducirPaginator();
    this.dataSource.sort = this.sort; 
    this.dataSource.paginator = this.paginator;
  }

  traducirPaginator(){
    this.paginator._intl.itemsPerPageLabel ="Registros por Página";
    this.paginator._intl.nextPageLabel = "Siguiente"
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primera Página";
    this.paginator._intl.lastPageLabel = "Última Página";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  platosPopulares(fechaDesde:String, fechaHasta:String) {
    this.service.platosPopulares(fechaDesde,fechaHasta).subscribe(response => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
        this.notifyTable();
    },
      error => {
        alert("Error en getAll" + error);
      })
  }

  notifyTable() {
    this.dataSource.data = [...this.dataSource.data];
  }

  public verDetalles(elemento : Plato) {
    this.platoSeleccionado = elemento;
    this.sidenavOpened = true;
  }

cargarPlatosPopulares():void{
  this.platosPopulares((<HTMLInputElement>document.getElementById("fechaDesde")).value.toString(),(<HTMLInputElement>document.getElementById("fechaHasta")).value.toString());
}
}
