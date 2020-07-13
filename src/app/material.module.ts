import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Agregar las importaciones que necesiten de Material
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatTabsModule],
  exports: [MatTabsModule],
})
export class MaterialModule {}
