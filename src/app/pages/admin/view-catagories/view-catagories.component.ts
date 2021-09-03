import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService,SPINNER } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-catagories',
  templateUrl: './view-catagories.component.html',
  styleUrls: ['./view-catagories.component.css']
})
export class ViewCatagoriesComponent implements OnInit {

  categories=[];


  constructor(private loader: NgxUiLoaderService,private _category:CategoryService) { }

  spinnerType=SPINNER.rectangleBouncePulseOutRapid;

  ngOnInit(): void {
    this.loader.start();
      this._category.categories().subscribe(
        (data:any)=>{
            this.categories=data;
        },
        (err)=>{console.log(err);}


      )
    this.loader.stop();
  }





}
