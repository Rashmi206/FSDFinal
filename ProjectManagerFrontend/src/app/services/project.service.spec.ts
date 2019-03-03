import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectService', () => {
  let project;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProjectService],
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('get list of projects', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.getAllProjects().subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('create a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const projObj = {
      project: 'New Project',
      manager: '5c7a91dc94cc730d68b4b21f',
    };
    service.addProject(projObj).subscribe(value => {
      project = value;
      expect(value.project).toEqual('New Project');
      done();
    });
  });

  it('get a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.getProjectById(project._id).subscribe(value => {
      expect(value).toEqual(project);
      done();
    });
  });

  it('edit a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const projObj = {
      project: 'New Modified Project'
    };
    service.editProject(projObj, project._id).subscribe(value => {
      expect(value._id).toEqual(project._id);
      project = value;
      done();
    });
  });

  it('delete a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.deleteProject(project._id).subscribe(value => {
      expect(value._id).toEqual(project._id);
      project = null;
      done();
    });
  });
});
