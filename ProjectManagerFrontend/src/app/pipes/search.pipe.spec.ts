import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('check search', () => {
    const pipe = new SearchPipe();
    const valueList = [
      { firstName: 'henry', lastName: 'clinton', employeeId: '5', _id: 'ewdsd' },
      { firstName: 'james', lastName: 'bond', employeeId: '1', _id: '5t433v' },
      { firstName: 'elite', lastName: 'christ', employeeId: '2', _id: '4355' },
      { firstName: 'krishna', lastName: 'raj', employeeId: '4', _id: '334r34v' },
      { firstName: 'aman', lastName: 'saxena', employeeId: '3', _id: '454343rf' },
    ];
    const changedValueList = pipe.transform(valueList, 'elite');
    expect(changedValueList[0].firstName).toContain('elite');
  });
  it('check sort', () => {
    const pipe = new SearchPipe();
    const valueList = [
      { firstName: 'henry', lastName: 'clinton', employeeId: '5', _id: 'ewdsd' },
      { firstName: 'james', lastName: 'bond', employeeId: '1', _id: '5t433v' },
      { firstName: 'elite', lastName: 'christ', employeeId: '2', _id: '4355' },
      { firstName: 'krishna', lastName: 'raj', employeeId: '4', _id: '334r34v' },
      { firstName: 'aman', lastName: 'saxena', employeeId: '3', _id: '454343rf' },
    ];
    const changedValueList = pipe.transform(valueList, null, 'employeeId');
    expect(changedValueList[0].firstName).toContain('james');
  });
});
