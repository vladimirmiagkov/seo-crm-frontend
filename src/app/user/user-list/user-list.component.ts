import {Component, OnInit} from '@angular/core';
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

  editUser(id) {
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
          },
          err => {
            //console.dir(err);
            this.userErrors = err;
            this.isLoading = false;
          });
    } else {
      //todo
      let userIndex = this.findUserIndexById(this.currentUser.id);
      if (null !== userIndex) {
        this.users[userIndex] = this.currentUser;
      }
    }
  }

  deleteUser(id) {
    let userIndex = this.findUserIndexById(id);
    if (null !== userIndex) {
      this.users.splice(userIndex, 1);
      this.currentUser = null;
    }
  }

  findUserIndexById(id): number {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        console.log('findUserIndexById id=' + id + ' UserIndex=' + i);
        return i;
      }
    }
    return null;
  }

  showDialogToAdd() {
    this.currentUser = new User();
    this.isNewUser = true;
    this.isDialogVisible = true;
  }
}