import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Pages',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'graphics', url: 'grafica1' },
        { titulo: 'CooCalc', url: 'coocalc' }
      ]
    },
  ];

  constructor() { }
}
