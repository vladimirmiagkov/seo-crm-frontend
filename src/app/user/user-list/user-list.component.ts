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
  public isDialogVisible: boolean;
  public errors: string = '';
  public isLoading: boolean = false;

  public objs: User[];
  public currentObj: User = new User();
  public isNewObj: boolean;

  constructor(private notificationService: NotificationService,
              private service: UserService) {
  }

  ngOnInit() {
    this.service.get().subscribe(
      result => {
        console.dir(result);
        this.objs = result.result;
      },
      err => {
        console.log(err);
      });
  }

  edit(id: string) {
    this.errors = '';
    this.isNewObj = false;
    this.currentObj = UtilService.cloneObject(
      this.objs[UtilService.findIndexById(this.objs, id)]
    );
    this.isDialogVisible = true;
  }

  save() {
    this.errors = '';
    this.isLoading = true;
    if (this.isNewObj) {
      this.service.create(this.currentObj).subscribe(
        result => {
          console.dir(result);
          this.objs.push(result.result);
          this.isLoading = false;
          this.currentObj = null;
          this.isDialogVisible = false;
          this.notificationService.addMessage({severity: 'success', summary: 'Create new user:', detail: 'New user have been<br>added successfully.'});
        },
        err => {
          //console.dir(err);
          this.errors = err;
          this.isLoading = false;
        });
    } else {
      let index = UtilService.findIndexById(this.objs, this.currentObj.id);
      if (null !== index) {
        this.service.update(this.currentObj).subscribe(
          result => {
            console.dir(result);
            this.objs[index] = result.result;
            this.isLoading = false;
            this.currentObj = null;
            this.isDialogVisible = false;
            this.notificationService.addMessage({severity: 'success', summary: 'Update user:', detail: 'User have been<br>updated successfully.'});
          },
          err => {
            //console.dir(err);
            this.errors = err;
            this.isLoading = false;
          });
      }
    }
  }

  delete(id: string) {
    let index = UtilService.findIndexById(this.objs, id);
    if (null !== index && confirm('Delete user ' + this.objs[index].username + '?')) {
      this.service.delete(id).subscribe(
        result => {
          console.dir(result);
          this.notificationService.addMessage({severity: 'success', summary: 'Delete user:', detail: 'The user was<br>successfully removed.'});
        },
        err => {
          //console.dir(err);
          this.notificationService.addMessage({severity: 'error', summary: 'Delete user:', detail: String(err)});
        });
      this.objs.splice(index, 1);
    }
  }

  showDialogToAdd() {
    this.errors = '';
    this.currentObj = new User();
    this.currentObj.roles = 'ROLE_CLIENT';
    this.isNewObj = true;
    this.isDialogVisible = true;
  }
}