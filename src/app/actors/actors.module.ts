import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsRoutingModule } from './actors-routing.module';
import { ActorsComponent } from './actors/actors.component';
import { ActorDialogComponent } from './actor-dialog/actor-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ActorsComponent,
    ActorDialogComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class ActorsModule { }
