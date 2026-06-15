import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-list',
  imports: [RouterLink],
  templateUrl: './events-list.html',
  styleUrl: './events-list.scss',
})
export class EventsList {}
