import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
