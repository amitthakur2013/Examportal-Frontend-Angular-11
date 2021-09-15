import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Injectable()
export class UsernameValidator {
  debouncer: any;
  constructor(private userService : UserService){
  }
  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);
    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.userService.getUser(control.value).subscribe((res) => {
          //console.log(res);
          resolve({'usernameInUse': true});
            
            
        }, (err) => {
          resolve(null);
        });
      }, 1000);
    });
  }
}