import { Component, OnInit } from '@angular/core';

import { IonIcon, IonTabBar, IonTabs,IonTabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs],
})
export class TabsComponent  implements OnInit {

  constructor() { 
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}

}
