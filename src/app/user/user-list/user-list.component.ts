import {Component, OnInit} from '@angular/core';

import {UtilService} from 'app/shared/util.service';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {NotificationService} from 'app/shared/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  public users: User[];

  public isDialogVisible: boolean;
  public isNewUser: boolean;
  public currentUser: User = new User();
  public userErrors: string = '';
  public isLoading: boolean = false;

  constructor(private notificationService: NotificationService,
              private userService: UserService) {
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
    let userIndex = UtilService.findIndexById(this.users, id);
    this.currentUser = UtilService.cloneObject(this.users[userIndex]);
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
            this.notificationService.addMessage({severity: 'success', summary: 'Create new user:', detail: 'New user have been<br>added successfully.'});
          },
          err => {
            //console.dir(err);
            this.userErrors = err;
            this.isLoading = false;
          });
    } else {
      let userIndex = UtilService.findIndexById(this.users, this.currentUser.id);
      if (null !== userIndex) {
        this.userService.updateUser(this.currentUser)
          .subscribe(
            result => {
              //console.dir(result);
              this.users[userIndex] = result;
              this.isLoading = false;
              this.currentUser = null;
              this.isDialogVisible = false;
              this.notificationService.addMessage({severity: 'success', summary: 'Update user:', detail: 'User have been<br>updated successfully.'});
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
    let userIndex = UtilService.findIndexById(this.users, id);
    if (null !== userIndex && confirm('Delete user ' + this.users[userIndex].username + '?')) {
      this.userService.deleteUser(id)
        .subscribe(
          result => {
            //console.dir(result);
            this.notificationService.addMessage({severity: 'success', summary: 'Delete user:', detail: 'The user was<br>successfully removed.'});
          },
          err => {
            //console.dir(err);
            this.notificationService.addMessage({severity: 'error', summary: 'Delete user:', detail: String(err)});
          });
      this.users.splice(userIndex, 1);
    }
  }

  showDialogToAdd() {
    this.userErrors = '';
    this.currentUser = new User();
    this.currentUser.roles = 'ROLE_CLIENT';
    this.isNewUser = true;
    this.isDialogVisible = true;
  }
}