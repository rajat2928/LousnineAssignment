import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{FormBuilder,Validators} from '@angular/forms';
import{observable, Observable} from 'rxjs'
import {User} from '../user'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalOptionsComponent} from '../modal-options/modal-options.component'
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  //#region  Variable
    dataSaved = false;
    userForm:any;
    allUsers:Observable<User[]>;
    userIdToUpdate = null;
    message = null;
    newuser= new User();
  //#endregion
  
  constructor(private formbuilder:FormBuilder, private userService: UserService, private  modalService: NgbModal) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      Name: ['',[Validators.required]],
      Email: ['',[Validators.required]],
      RoleType: ['',[Validators.required]],
      Status: ['',[Validators.required]]
    });
    this.loadAllUsers();
    }

  //Method use to load all the user
  public loadAllUsers()
  {
    this.allUsers = this.userService.getAllUser();
    console.log("getAllUser: End");
    this.allUsers.forEach(element => {
    console.log(element);
    })
  }

  //Method Create User on clicking Submit button
  public onFormSubmit(){
    this.dataSaved=false;
    let user = new User();
    user.Name = this.userForm.value.Name;
    user.Email = this.userForm.value.Email;
    user.Status = this.userForm.value.Status;
    user.RoleType = this.userForm.value.RoleType;
    this.CreateUpdateUser(user);
    this.userForm.reset;
    this.loadAllUsers();
  }

  //Method use to call Create and Update the User from service
  CreateUpdateUser(user:User)
  {
    if(this.userIdToUpdate==null)
    {
      this.userService.createUser(user).subscribe(
        ()=>{
          this.dataSaved=true;
          this.message = "Record Saved Successfully";
          this.loadAllUsers();
          this.userIdToUpdate = null;
          this.userForm.reset;
        }
      )
    }
    else
    {
      user.Id = this.userIdToUpdate;
      this.userService.updateUser(user)
      .subscribe(()=>{
        this.dataSaved=true;
        this.message = "Record Updated Successfully";
        this.loadAllUsers();
        this.userIdToUpdate = null;
        this.userForm.reset;
      });
    }
  }

  //Load user in the form for edi
  loadUserToEdit(userid: number)
  {
    this.userService.getUserById(userid).subscribe(user=>{
      this.message=null;
      this.dataSaved = false;
      this.userIdToUpdate = user.Id;
      this.userForm.controls['Name'].setValue();
      this.userForm.controls['Email'].setValue();
      this.userForm.controls['RoleType'].setValue();
      this.userForm.controls['Status'].setValue();
    })
  }

  //Delete User
  deleteUser(userid: number){
    this.userService.deleteUserById(userid).subscribe(
      ()=>{
        this.message = "Record Deleted Successfully";
        this.loadAllUsers();
        this.userIdToUpdate = null;
        this.userForm.reset;
      })

  }

  //Reset Form
  resetForm(){
    this.userForm.reset();
    this.message = null;
    this.dataSaved = null;
  }

  //Edit Dialog Box
  editItem(edituser: User)
  {
    console.log("editItem:" + edituser);

    const ref = this.modalService.open(ModalOptionsComponent, { centered: true });
    ref.componentInstance.bodyUser = edituser;

    ref.result.then((yes)=>{
        console.log("Ok Click");
        this.loadAllUsers();
    },
    (cancel)=>{
      console.log("cancel click");
      this.loadAllUsers();
    })
  }
}
