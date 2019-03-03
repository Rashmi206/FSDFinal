import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  let parent, task;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TaskService],
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('create a parent task', (done: DoneFn) => {
    const service: TaskService = TestBed.get(TaskService);
    const parentObj = {
      parent: 'Parent Task 1',
      projectId: '5c7b7bd3d722bc1b0462328b'
    };
    service.addParentTask(parentObj).subscribe(value => {
      parent = value;
      expect(value.parent).toEqual('Parent Task 1');
      done();
    });
  });

  it('create a task', (done: DoneFn) => {
    const service: TaskService = TestBed.get(TaskService);
    const taskObj = {
      task: 'Sample Task',
      projectId: '5c7b7bd3d722bc1b0462328b',
      userId: '5c7a91dc94cc730d68b4b21f'
    };
    service.addTask(taskObj).subscribe(value => {
      task = value;
      expect(value.task).toEqual('Sample Task');
      done();
    });
  });

  it('get tasks by project', (done: DoneFn) => {
    const service: TaskService = TestBed.get(TaskService);
    service.viewTaskByProject('5c7b7bd3d722bc1b0462328b').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('end a task', (done: DoneFn) => {
    const service: TaskService = TestBed.get(TaskService);
    const data = {
      "finished": true
    };
    service.endTask(task._id, data).subscribe(value => {
      expect(value._id).toEqual(task._id);
      task = value;
      done();
    });
  });

  it('get parent by id', (done: DoneFn) => {
    const service: TaskService = TestBed.get(TaskService);
    service.getParentById(parent._id).subscribe(value => {
      expect(value).toEqual(parent);
      done();
    });
  });

  it('get parents by project', (done: DoneFn) => {
    const service: TaskService = TestBed.get(TaskService);
    service.getParentsByProject('5c7b7bd3d722bc1b0462328b').subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

});
