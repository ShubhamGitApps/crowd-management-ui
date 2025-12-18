import { Component } from '@angular/core';
import { EntryExitFacade } from './entry-exit.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entry-exit',
  imports: [CommonModule],
  providers: [EntryExitFacade],
  templateUrl: './entry-exit.component.html',
  styleUrl: './entry-exit.component.css',
})
export class EntryExitComponent {
  constructor(public facade: EntryExitFacade) {}
}
