import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('title', [
      transition(':enter', [
        style({
          'opacity': '0'
        }),
        animate('2.1s ease-in',
          style({
            'opacity': '1'
          })
        )
      ])
    ])
  ]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
