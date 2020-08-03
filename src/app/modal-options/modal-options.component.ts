import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{FormBuilder,Validators} from '@angular/forms';
import{observable, Observable} from 'rxjs'
import {User} from '../user'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.css']
})
export class ModalOptionsComponent implements OnInit {
  //#region  Variable
  dataSaved = false;
  userForm:any;
  allUsers:Observable<User[]>;
  userIdToUpdate = null;
  message = null;
  newuser= new User();
  user: User;
  bodyUser: any;
//#endregion



  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
    Name: ['',[Validators.required]],
    Email: ['',[Validators.required]],
    RoleType: ['',[Validators.required]],
    Status: ['',[Validators.required]],
    Edit: ['',[Validators.required]],
    Id: ['',[Validators.required]]
    });

    this.setForm();
  }

  constructor(public modal: NgbActiveModal,private formbuilder:FormBuilder, private userService: UserService, private  modalService: NgbModal) {}

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
    this.modal.dismiss();
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
          this.userIdToUpdate = null;
          this.userForm.reset;
        }
      )
     console.log("create User: End" + Date);
    }
    else
    {
      user.Id = this.userIdToUpdate;
      this.userService.updateUser(user)
      .subscribe(()=>{
        this.dataSaved=true;
        this.message = "Record Updated Successfully";
        this.userIdToUpdate = null;
        this.userForm.reset;
      });
     console.log("Update User: End");
    }
  }

  //Load user in the form for edi
  loadUserToEdit(userid: number)
  {
    this.userService.getUserById(userid).subscribe(user=>{
      this.message=null;
      this.dataSaved = false;
      this.userIdToUpdate = user.Id;
      this.userForm.controls['Name'].setValue(user.Name);
      this.userForm.controls['Email'].setValue(user.Email);
      this.userForm.controls['RoleType'].setValue(user.RoleType);
      this.userForm.controls['Status'].setValue(user.Status);
      this.userForm.controls['Edit'].setValue("True");
      this.userForm.controls['Id'].setValue(user.Id);
    })
  }

  //Delete User
  deleteUser(userid: number){
    this.userService.deleteUserById(userid).subscribe(
      ()=>{
        this.message = "Record Deleted Successfully";
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

  //Set Form
  setForm(){
    console.log(this.bodyUser);

    if(this.bodyUser!=null && this.bodyUser.Id!=null)
    {
        this.userIdToUpdate = this.bodyUser.Id;
        this.userForm = this.formbuilder.group({
        Name: [this.bodyUser.Name,[Validators.required]],
        Email: [this.bodyUser.Email,[Validators.required]],
        RoleType: [this.bodyUser.RoleType,[Validators.required]],
        Status: [this.bodyUser.Status,[Validators.required]],
        Id: [this.bodyUser.Id,[Validators.required]],
        Edit: ["True",[Validators.required]]
        });
        this.bodyUser = new User();
    }
  }
}