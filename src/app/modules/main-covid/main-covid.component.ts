import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-main-covid',
  templateUrl: './main-covid.component.html',
  styleUrls: ['./main-covid.component.scss']
})
export class MainCovidComponent implements OnInit {
  currentDateParrent: any;
  scroll = (event): void => {
    console.log(event);
    //scroll event window
    //move card with details with the scroll
  };
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
}

}
function onWindowScroll() {
  throw new Error('Function not implemented.');
}

