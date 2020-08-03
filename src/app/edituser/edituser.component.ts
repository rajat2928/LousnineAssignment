import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{FormBuilder,Validators} from '@angular/forms';
import{observable, Observable} from 'rxjs'
import {User} from '../user'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalOptionsComponent} from '../modal-options/modal-options.component'

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  //#region  Variable
  dataSaved = false;
  userForm:any;
  allUsers:Observable<User[]>;
  userIdToUpdate = null;
  message = null;
//#endregion

  constructor(private  modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }
  //Method use to load all the user
  loadAllUsers()
  {
    this.allUsers = this.userService.getAllUser();
  }

//Edit Dialog Box
editItem(user: User)
{
  const ref = this.modalService.open(ModalOptionsComponent);
  ref.componentInstance.user = user;

  ref.result.then((result) => {
    console.log(result);
    console.log('closed');
  }).catch( (result) => {
    console.log(result);
    console.log('cancelling');
  });
}
}
