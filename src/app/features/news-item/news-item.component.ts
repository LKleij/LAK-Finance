import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input('image-url') imageUrl: string;
  @Input('title') title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
