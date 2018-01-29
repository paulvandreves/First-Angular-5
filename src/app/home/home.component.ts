import { Component, OnInit} from '@angular/core';

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations'; 
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // this allows you to write your inline css 
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
       transition('* => *',[  // (any to any)
          query(':enter', style({opacity: 0 }), {optional: true}),

          query(':enter', stagger('300ms', [         // for when items enter the dom 
            animate('.6s ease-in', keyframes([
              style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1})
            ]))]), {optional: true}),

            query(':leave', stagger('300ms', [     /// for when items leave the dom 
              animate('.6s ease-in', keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
                style({opacity: 0, transform: 'translateY(-75%)', offset: 1})
              ]))]), {optional: true})

       ])  
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item'; 
  goalText: string = 'My first life goal'; 
  goals = []; 
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res); 
    this.itemCount = this.goals.length; 
    this._data.changeGoal(this.goals); 
  }

  addItem() {
    this.goals.push(this.goalText); 
    this.goalText = ''; 
    this.itemCount = this.goals.length; 
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i,1); 
    this._data.changeGoal(this.goals);
  }
// every time an item is added or removed we change or update the goal property 
}
