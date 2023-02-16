import { Component } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { DemoService } from './service/demo.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  cookieMessage:any = 'Accept all cookies';
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  configDetail:any;
  constructor(
    private demoService:DemoService,
    private envService: EnvironmentService
  ) {}

  ngOnInit() {
 
    this.getDemoDetails();
  }

  getDemoDetails(){
    this.demoService.getDemoConfig().subscribe((res:any)=>{
      this.configDetail = res?.Message
      console.log('log',this.configDetail);
      
    })
  }
}
