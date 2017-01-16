import {Component, OnInit} from '@angular/core';

import {Message} from 'primeng/primeng';

import {UserService} from '../user.service';
import {User} from '../user.model';
declare let jQuery: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  users: User[];

  isDialogVisible: boolean;
  isNewUser: boolean;
  currentUser: User = new User();
  userErrors: string = '';
  isLoading: boolean = false;

  popupMessages: Message[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        result => {
          console.dir(result);
          this.users = result;
        },
        err => {
          console.log(err);
        });
  }

  editUser(id: string) {
    this.userErrors = '';
    this.isNewUser = false;
    let userIndex = this.findUserIndexById(id);
    this.currentUser = jQuery.extend(true, {}, this.users[userIndex]); // clone user
    this.isDialogVisible = true;
  }

  saveUser() {
    this.userErrors = '';
    this.isLoading = true;
    if (this.isNewUser) {
      this.userService.createUser(this.currentUser)
        .subscribe(
          result => {
            //console.dir(result);
            this.users.push(result);
            this.isLoading = false;
            this.currentUser = null;
            this.isDialogVisible = false;
            this.popupMessages.push({severity: 'success', summary: 'Create new user:', detail: 'New user have been<br>added successfully.'});
          },
          err => {
            //console.dir(err);
            this.userErrors = err;
            this.isLoading = false;
          });
    } else {
      let userIndex = this.findUserIndexById(this.currentUser.id);
      if (null !== userIndex) {
        //this.users[userIndex] = this.currentUser;
        this.userService.updateUser(this.currentUser)
          .subscribe(
            result => {
              //console.dir(result);
              this.users[userIndex] = result;
              this.isLoading = false;
              this.currentUser = null;
              this.isDialogVisible = false;
              this.popupMessages.push({severity: 'success', summary: 'Update user:', detail: 'User have been<br>updated successfully.'});
            },
            err => {
              //console.dir(err);
              this.userErrors = err;
              this.isLoading = false;
            });
      }
    }
  }

  deleteUser(id: string) {
    let userIndex = this.findUserIndexById(id);
    if (null !== userIndex && confirm('Delete user ' + this.users[userIndex].username + '?')) {
      this.userService.deleteUser(id)
        .subscribe(
          result => {
            //console.dir(result);
            this.popupMessages.push({severity: 'success', summary: 'Delete user:', detail: 'The user was<br>successfully removed.'});
          },
          err => {
            //console.dir(err);
            this.popupMessages.push({severity: 'error', summary: 'Delete user:', detail: String(err)});
          });
      this.users.splice(userIndex, 1);
    }
  }

  findUserIndexById(id: string): number {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        //console.log('findUserIndexById id=' + id + ' UserIndex=' + i);
        return i;
      }
    }
    return null;
  }

  showDialogToAdd() {
    this.userErrors = '';
    this.currentUser = new User();
    this.currentUser.roles = 'ROLE_CLIENT';
    this.isNewUser = true;
    this.isDialogVisible = true;
  }
}