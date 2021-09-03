import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={title:'',description:''};


  constructor(private snack:MatSnackBar,private categoryService:CategoryService) { }

  ngOnInit(): void {
  }


  public addCategory(){

    if(this.category.title=='' || this.category.title==null )
    {

      this.snack.open('Title required','OK',{
        duration:3000
      })

      return;
    }

    this.categoryService.addCategory(this.category).subscribe(

      (data:any)=>{
        Swal.fire("Success !!","Category saved successfully",'success');
        this.refreshCategory();
      },
      (err)=>{
        Swal.fire("Something went wrong",'error');
        this.refreshCategory();
      }

    );
  }

  public refreshCategory(){
    this.category.title='';
    this.category.description='';
  }

}
