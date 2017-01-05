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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        result => {
          //console.dir(result);
          this.users = result;
          console.dir(this.users);
        },
        err => {
          console.log(err);
          //this.error = String(err);
        });
  }

  editUser(id) {
    this.isNewUser = false;
    let userIndex = this.findUserIndexById(id);
    this.currentUser = jQuery.extend(true, {}, this.users[userIndex]); // clone user
    this.isDialogVisible = true;
  }

  saveUser() {
    if (this.isNewUser) {
      this.currentUser.id = String(this.users.length + 1); // set user id for new user
      this.users.push(this.currentUser);
    } else {
      let userIndex = this.findUserIndexById(this.currentUser.id);
      if (null !== userIndex) {
        this.users[userIndex] = this.currentUser;
      }
    }
    this.currentUser = null;
    this.isDialogVisible = false;
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