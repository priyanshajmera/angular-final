import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  workouts$ = from(this.authService.user).pipe(
    switchMap((user) => {
      return this.angularFireDatabase
        .list<Workout>(`workouts/${user?.uid}`)
        .snapshotChanges();
    }),
    tap((res) =>
      this.store.set(
        'workouts',
        res.map((el) => ({ ...el.payload.val(), $key: el.key }))
      )
    )
  );

  constructor(
    private store: Store,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {}

  addWorkout(workout: Workout) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase
        .list(`workouts/${user?.uid}`)
        .push(workout);
    });
  }

  removeWorkout(key: string) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase.list(`workouts/${user?.uid}`).remove(key);
    });
  }

  getWorkout(key: string) {
    if (!key) return of({});

    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts: Workout[]) =>
        workouts.find((workout: Workout) => workout.$key === key)
      )
    );
  }

  updateWorkout(key: string, workout: Workout) {
    return from(this.authService.user).subscribe((user) => {
      return this.angularFireDatabase
        .object(`workouts/${user?.uid}/${key}`)
        .update(workout);
    });
  }
}