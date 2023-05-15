import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { truckScaleRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(truckScaleRoutes)],
})
export class TruckScaleModule {}
