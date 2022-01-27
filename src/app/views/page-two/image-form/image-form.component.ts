import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from 'src/app/services/data/api.service';

@Component({
  selector: 'hmw-image-form',
  templateUrl: './image-form.component.html'
})
export class ImageFormComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  mergeImages() {
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var context = canvas.getContext('2d');

    let img1 = new Image();
    let img2 = new Image();

    img1.onload = function () {
      canvas.width = img1.width;
      canvas.height = img1.height;
      img2.src = 'imgfile2.png';
    };
    img2.onload = function () {
      context.globalAlpha = 1.0;
      context.drawImage(img1, 0, 0);
      context.globalAlpha = 0.5; //Remove if pngs have alpha
      context.drawImage(img2, 0, 0);
    };

    img1.src = 'imgfile1.png';
  }


  public selected: IProduct = {

    id: 0,
    name: 'Angry Bride',
    img: 'http://apimeme.com/meme?meme=You-Dont-Want-No-Part-Of-This&top=Top+text&bottom=Bottom+text'

  };

  constructor() { }

  ngOnInit(): void {
  }

}
