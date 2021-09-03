import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid = 0;
  quiz:any;
  categories:any;
  constructor(private route:ActivatedRoute,private _quizService:QuizServiceService,private _categoryService : CategoryService, private router:Router) { }

  ngOnInit(): void {
    debugger;
      this.qid = this.route.snapshot.params.quid;
      this.getCaegory();
      this.getQuizById();
  }

  getCaegory(){
    this._categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      }
    )
  }

  getQuizById(){
    this._quizService.getQuiz(this.qid).subscribe(

      (data:any)=>{
          this.quiz=data;
          console.log(this.quiz);
      },
      (err)=>{
        Swal.fire(err);
      }

    );
  }
  updateQuiz(quiz:any){
    debugger;
    this._quizService.updateQuiz(quiz).subscribe(

       (data)=>{
         Swal.fire('Success !','Quiz updated','success').then((event)=>{
          this.router.navigate(['/admin-dashboard/view-quizes']);
         });

       },
       (err)=>{
        Swal.fire('Error !','Something went wrong','error');
       }
    );
  }

}
