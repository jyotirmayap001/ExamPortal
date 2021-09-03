import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizes = [];


  constructor(private loader: NgxUiLoaderService, private _quizService: QuizServiceService) { }

  spinnerType = SPINNER.rectangleBouncePulseOutRapid;

  ngOnInit(): void {

    this.getQuiz();

  }

  getQuiz() {
    this.loader.start();
    this._quizService.getQuizzes().subscribe(

      (data: any) => {
        this.loader.stop();

        this.quizes = data;
      },
      (error) => {
        this.loader.stop();
      }

    );

  }

makeUpdateQuizUrl(quid:number){
return '/admin-dashboard/update-quiz/' +quid;
}


  deleteQuiz(quizid) {


    Swal.fire({
      icon: 'warning',
      title: 'Are you want to sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then(
      (result) => {

        if (result.isConfirmed) {

          this.loader.start();

          this._quizService.deleteQuiz(quizid).subscribe(

            (data: any) => {
              this.loader.stop();
              this.getQuiz();
              Swal.fire("Deleted", "Deleted successfully.", "success");
            },
            (error) => {
              this.loader.stop();
              this.getQuiz();
              Swal.fire("Error", "Something went wrong.", "error");
            }

          );

        }

      }
    )

  }

}
