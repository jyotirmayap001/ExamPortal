import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseurl from './helper';


@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private _http:HttpClient) { }

  

  public getQuizzes(){
    return this._http.get(`${baseurl}/quiz/get-quiz`);
  }

  public addQuiz(quizData:any){
    return this._http.post(`${baseurl}/quiz/add-quiz`,quizData);
  }

  public deleteQuiz(quizId){
    return this._http.delete(`${baseurl}/quiz/delete-quiz/${quizId}`);
  }

  public getQuiz(qid){
    return this._http.get(`${baseurl}/quiz/get-quiz/${qid}`);
  }

  public updateQuiz(quizData:any){
    return this._http.put(`${baseurl}/quiz/update-quiz`,quizData);
  }


}
