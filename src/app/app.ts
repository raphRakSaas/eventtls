import { Component } from '@angular/core';

import { Layout } from './shared/components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  template: `<app-layout />`,
  styleUrl: './app.scss',
})
export class App {}
