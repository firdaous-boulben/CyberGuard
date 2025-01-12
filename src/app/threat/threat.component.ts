import { Component } from '@angular/core';
import { faChartBar, faKeyboard, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-threat',
  templateUrl: './threat.component.html',
  styleUrl: './threat.component.css'
})
export class ThreatComponent {
  faNetworkWired = faNetworkWired;
  faKeyboard = faKeyboard;
  faChartBar = faChartBar;
}
