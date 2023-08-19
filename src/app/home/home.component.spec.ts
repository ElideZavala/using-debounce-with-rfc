import { HttpClientModule } from '@angular/common/http';
import {
  waitForAsync,
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  tick,
  TestBed,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send an http request before the debounce the debounceTime of 300ms', fakeAsync(async () => {
    spyOn(component, 'searchUsers'); // spy nos permite espiar un metodo y ver si fue llamado
    component.searchForm.get('username').setValue('iri'); // seteamos el valor del input
    tick(component.searchDebounceTime - 10); // tick nos permite avanzar el tiempo en milisegundos
    expect(component.searchUsers).not.toHaveBeenCalled(); // verificamos que el metodo no haya sido llamado
    discardPeriodicTasks(); // descartamos las tareas pendientes
  }));

  it('should send an http request after the debounceTime of 300ms', fakeAsync(async () => {
    spyOn(component, 'searchUsers'); // spy nos permite espiar un metodo y ver si fue llamado
    component.searchForm.get('username').setValue('iri'); // seteamos el valor del input
    tick(component.searchDebounceTime + 10); // tick nos permite avanzar el tiempo en milisegundos
    expect(component.searchUsers).toHaveBeenCalled(); // verificamos que el metodo haya sido llamado
    discardPeriodicTasks(); // descartamos las tareas pendientes
  }));
});
