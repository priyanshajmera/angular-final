import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';


export interface ScheduleItem {
  meals: any
  workouts: any
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$.pipe(tap((res) => this.store.set('selected', res)));

  list$ = this.section$.pipe(
    map((res: any) => this.store.value[res.type]),
    tap((res) => this.store.set('list', res))
  );

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap((res) => this.store.set('date', res)),
    map((res: Date) => {
      const startAt = new Date(
        res.getFullYear(),
        res.getMonth(),
        res.getDate()
      ).getTime();

      const endAt =
        new Date(
          res.getFullYear(),
          res.getMonth(),
          res.getDate() + 1
        ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }) => this.getSchedule(startAt, endAt)),
    map((res: any) => {
      const mapped: ScheduleList = {};

      for (const prop of res) {
        if (!mapped[prop.payload.val().section]) {
          mapped[prop.payload.val().section] = prop.payload.val();
        } else {
          mapped[prop.payload.val().section] = {
            ...mapped[prop.payload.val().section],
            ...prop.payload.val(),
          };
        }
      }

      return mapped;
    }),
    tap((res) => this.store.set('schedule', res))
  );

  constructor(
    private store: Store,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(section: any) {
    this.section$.next(section);
  }

  private createSection(payload: ScheduleItem) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase
        .list(`schedule/${user?.uid}`)
        .push(payload);
    });
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase
        .object(`schedule/${user?.uid}/${key}`)
        .update(payload);
    });
  }

  private getSchedule(startAt: number, endAt: number) {
    return from(this.authService.user).pipe(
      switchMap((user) => {
        return this.angularFireDatabase
          .list(`schedule/${user?.uid}`, (ref:any) =>
            ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
          )
          .snapshotChanges();
      })
    );
  }
}