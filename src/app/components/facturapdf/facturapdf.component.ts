import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facturapdf',
  templateUrl: './facturapdf.component.html',
  styleUrls: ['./facturapdf.component.css']
})
export class FacturapdfComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  /*downloadFactura() {
    var element = document.getElementById('fact');
    html2canvas(element).then((canvas)=>{
      console.log(canvas);
      var imgData = canvas.toDataURL('image/png');
      var doc  = new jspdf();
      var imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imgHeight);
      doc.save("factura.pdf");
    })
  }*/

}
