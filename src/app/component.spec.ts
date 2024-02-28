import { AppComponent } from "./app.component";
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

test(`the title is 'devsu-test-angular'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('devsu-test-angular');
}));
test('it creates my component', () => {
    expect(AppComponent).toBeTruthy();
  });