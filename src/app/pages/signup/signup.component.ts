import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsernameValidator } from '../../validators/username';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  toggle_pass=false;

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  userForm = this.fb.group({
  	username:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')],this.usernameValidator.checkUsername.bind(this.usernameValidator)],
  	password:['',[Validators.required]],
  	email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
  	phone:['',  [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
  	firstName:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]],
  	lastName:['',[Validators.required,Validators.pattern('[a-zA-Z ]+')]]
  });

  constructor(private userService : UserService, private snack:MatSnackBar, private fb: FormBuilder, private usernameValidator: UsernameValidator) { }

  ngOnInit(): void {
  }

  openSnackBar(message) {
    this.snack.open(message,'X',{
    duration:2000
    }
    );
  }

  formSubmit(){
  	this.userService.addUser(this.userForm.value).subscribe((data) =>{
  		//success
  		console.log(data);
  		Swal.fire(
	      'Success',
	      'You are Successfully Registered!',
	      'success'
	    )
  	},
  	(err) => {
  		//error
  		if(err.status === 422)
  			this.openSnackBar(err.error);
  		else
  			this.openSnackBar("Something went wrong!");
  	}
  	);

  	//console.warn(this.userForm.value);
  }

}
