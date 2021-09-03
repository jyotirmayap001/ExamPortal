import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
  
  ];


  quiz={

    title:'',
    description:'',
    maxmarks:'',
    numberofquestion:'',
    active:true,
    category:{cid:''} 

  };

  constructor(private snack:MatSnackBar,private _categoryService: CategoryService,
    private loader: NgxUiLoaderService,private _quizService:QuizServiceService) { }

  spinnerType=SPINNER.rectangleBouncePulseOutRapid;

  ngOnInit(): void {

    this.loader.start();
    this._categoryService.categories().subscribe(

      (data:any)=>{

        this.categories=data;
        this.loader.stop();
      },
      (error)=>{
        this.loader.stop();
      }

    );

  }

  addQuiz(){

    if(this.quiz.title=='' || this.quiz.title==null){

      this.snack.open('Title required','OK',{

        duration:3000
      })
      return;

    }

    if(this.quiz.description=='' || this.quiz.description==null){

      this.snack.open('Description required','OK',{

        duration:3000
      })
      return;

    }
    if(this.quiz.maxmarks=='' || this.quiz.maxmarks==null){

      this.snack.open('Maximum marks required','OK',{

        duration:3000
      })
      return;

    }
    if(this.quiz.numberofquestion=='' || this.quiz.numberofquestion==null){

      this.snack.open('No. of questions required','OK',{

        duration:3000
      })
      return;
    }


    if( this.quiz.category==null){

      this.snack.open('Please choose category','OK',{

        duration:3000
      })
      return;
    }
    this.loader.start();

    this._quizService.addQuiz(this.quiz).subscribe(

      (data:any)=>{
        this.loader.stop();
        this.refresh();
        Swal.fire("Success","Quiz added successfully","success");
      },
      (error)=>{
        Swal.fire("Error","Something went wrong","error");
      }


    );



  }

  refresh(){

    this.quiz.title=''
    this.quiz.numberofquestion='';
    this.quiz.maxmarks='';
    this.quiz.description='';
    this.quiz.active=false;
    this.quiz.category.cid=''
  }

}
