import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  let user;
  beforeEach(() => TestBed.configureTestingModule({providers: [UserService],
    imports: [
      HttpClientModule,
    ]}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('add new user', (done: DoneFn) => {
    const service: UserService = TestBed.get(UserService);
    const userObj = {
      firstName: 'Test Firstname',
      lastName: 'Test lastname',
      employeeId: '11212',
    };
    service.addUser(userObj).subscribe(value => {
      expect(value.firstName).toEqual(userObj.firstName);
      user = value;
      done();
    });
  });

  it('get existing user', (done: DoneFn) =>{
    const service: UserService = TestBed.get(UserService);
    service.getUserById(user._id).subscribe(value =>{
      expect(value.firstName).toEqual(user.firstName);
      done();
    })
  })

  it('edit existing user', (done: DoneFn) => {
    const service: UserService = TestBed.get(UserService);
    const userObj = {
      firstName: 'Modified User Firstname',
      lastName: 'Modified User lastname',
      employeeId: '11212',
    };
    service.editUser(userObj, user._id).subscribe(value => {
      expect(value.firstName).toEqual(userObj.firstName);
      user = value;
      done();
    });
  });

  it('delete existing user', (done: DoneFn) => {
    const service: UserService = TestBed.get(UserService);
    service.deleteUser(user._id).subscribe(value => {
      expect(value.firstName).toEqual(user.firstName);
      user = null;
      done();
    });
  });

});
