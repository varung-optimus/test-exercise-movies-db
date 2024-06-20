import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actor } from '../types/actor.model';
import { actorsService } from '../actors.service';
import { ActorDialogComponent } from './../actor-dialog/actor-dialog.component';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent {
  actors: Actor[] = [];
  private search = '';

  constructor(
    private actorsService: actorsService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    const actors = await this.actorsService.getActors('1');
    this.actors = actors;
  }

  async onSearchChange(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    this.actors = await this.actorsService.getActors('1', {
      name: this.search,
    });
  }

  addNew() {
    this.dialog
      .open(ActorDialogComponent, {
        minWidth: '300px',
      })
      .afterClosed()
      .subscribe(async () => {
        this.actors = await this.actorsService.getActors('1', {
          name: this.search,
        });
      });
  }
}
