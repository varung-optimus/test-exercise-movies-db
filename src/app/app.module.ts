import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieDialogComponent } from "./movies/movie-dialog/movie-dialog.component";
import { ActorsComponent } from "./actors/actors/actors.component";
import { ActorDialogComponent } from "./actors/actor-dialog/actor-dialog.component";
import { MoviesComponent } from "./movies/movies/movies.component";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ActorsComponent,
    ActorDialogComponent,
    MovieDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
