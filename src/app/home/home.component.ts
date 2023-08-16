import { RegisterComponent } from '../register/register.component';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { API_BASE_URL } from '../model/constants';
import { User } from '../model/user';
import { UserAuthService } from '../_service/user-auth.service';
import { CommentResponse } from '../model/comment-response';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../_service/post-service.service';
import { PostResponse } from '../model/post-response';
import { Router } from '@angular/router';
import { NgForm ,NgModel,NgModelGroup} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports:[FormsModule, CommonModule]
})
export class HomeComponent implements OnInit{
  constructor(private userAuthservice:UserAuthService,
    private postService:PostServiceService,
    private router:Router
    ){}

  // comments related 
  commentspage: number = 1;
  commentsResultSize:number=5;
  hasNocomments: boolean = false;
  hasMoreComments:boolean=true;
  fetchingComments:boolean=false;
  postCommentResponses: CommentResponse[] = [];
  cpostId!:number;
  comment!:string;

  apiurl=API_BASE_URL
  authUser!: User;

  // post related 
  postResponsesar: PostResponse[] = [];
  resultPage: number = 1;
  resultSize: number = 10;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  loadingProfile: boolean = false;
  hasNoPost: boolean = false;

   // other vars

   private subscriptions: Subscription[] = [];
   isProfileViewerOwner: boolean = false;
   viewerFollowsProfileUser: boolean = false;
   profileUserId!: number;
   profileUser!: User;

  ngOnInit(): void {

    if(this.userAuthservice.isLoggedIn()){
      this.subscriptions.push(
        this.postService.getTimelinePosts(this.resultPage,this.resultSize).subscribe(
          (postResponses:PostResponse[])=>{
            postResponses.forEach(pr=>this.postResponsesar.push(pr));
          }
        )
      );
    }
    else{
      this.router.navigateByUrl('/register');
    }

  }


  loadPostComments(postId: number) {
    this.subscriptions.push(
      this.postService.getPostComments(postId, this.commentspage, this.commentsResultSize).subscribe(
        (commentResponses: CommentResponse[]) => {
          commentResponses.forEach(cmr => this.postCommentResponses.push(cmr));
          if (commentResponses.length <= 0 && this.commentspage === 1) this.hasNocomments = true;
          if (commentResponses.length <= 0) this.hasMoreComments = false;
          this.fetchingComments = false;
          this.commentspage++;
        }, (error) => {
          console.log(error);
        }
      )
    );
    
  }

  createComment(){
    this.subscriptions.push(
      this.postService.createPostComment(this.cpostId,this.comment).subscribe(
        (commentResponses: CommentResponse) => {
         console.log(commentResponses);
        }, (error) => {
          console.log(error);
        }
      )
    );
    location.reload()

    console.log(this.cpostId+" "+this.comment);
  }


}
