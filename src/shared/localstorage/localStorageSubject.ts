import { BehaviorSubject } from "rxjs";

export class LocalStorageSubject<T> extends BehaviorSubject<T> {
    constructor(
        private storageKey: string,
        value: T
    ) {
        super(value);

        const subject : string | null = localStorage.getItem(storageKey);
        if(subject) {
            this.next(JSON.parse(subject) as T);
        }
        this.subscribe((it:T) => {
            if(it){
                localStorage.setItem(storageKey, JSON.stringify(it));
            } else {
                localStorage.removeItem(storageKey);
            }
        });

    }
}

