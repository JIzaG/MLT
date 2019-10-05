import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { EChartOption } from 'echarts';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import {PacientesService} from '../../../services/pacientes/pacientes.service';

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent extends BasePageComponent implements OnInit, OnDestroy {
  hsOptions: EChartOption;
  paOptions: EChartOption;
  pgOptions: EChartOption;
  dOptions: EChartOption;
  piOptions: EChartOption;
  heOptions: EChartOption;
  appointments: any[];
  piePatternSrc: string;
  piePatternImg: any;
  pieStyle: any;

  public contarpacientes : any[];

  agenda: string;
  tratamiento:string;
  pacientes:string;
  citas: string;


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private patientService: PacientesService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: '',
      loaded: false,
      breadcrumbs: [
        {
          title: 'Dashboards',
          route: 'default-dashboard'
        },
        {
          title: 'Default'
        }
      ]
    };
    this.appointments = [];
    this.piePatternSrc = 'data:image/jpeg;base64,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';
    this.piePatternImg = new Image();
    this.piePatternImg.src = this.piePatternSrc;
    this.pieStyle = {
      normal: {
        opacity: 0.7,
        color: {
          image: this.piePatternImg,
          repeat: 'repeat'
        },
        borderWidth: 3,
        borderColor: '#336cfb'
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.patientService.getAgendaPaciente().subscribe(data=>{
       
      console.log(data.length);
      this.agenda=String(data.length);
    })


    this.patientService.getPacientes().subscribe(data=>{
      console.log(data.length);
      this.pacientes=String(data.length);

    })

    
    this.patientService.getTratamiento().subscribe(data=>{

      console.log(data.length);
      this.tratamiento=String(data.length);
    })

    this.patientService.getCitasClinica().subscribe(data=>{

      console.log(data.length);
      this.citas=String(data.length);
    })




    this.getData('assets/data/last-appointments.json', 'appointments', 'setLoaded');

    this.setHSOptions();
    this.setPAOptions();
    this.setPGOptions();
    this.setDOptions();
    this.setPIOptions();
    this.setHEOptions();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  setHSOptions() {
    this.hsOptions = {
      color: ['#ed5564', '#336cfb'],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['Patients 2018', 'Patients 2019']
      },
      grid: {
        left: 30,
        right: 0,
        top: 50,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#336cfb'
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Patients ' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
        },
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#ed5564'
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Patients ' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: ['2018-1', '2018-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Patients 2018',
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          data: [159, 149, 174, 182, 219, 201, 175, 182, 119, 118, 112, 96]
        },
        {
          name: 'Patients 2019',
          type: 'line',
          smooth: true,
          data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226]
        }
      ]
    };
  }

  setPAOptions() {
    this.paOptions = {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      tooltip : {
        trigger: 'item',
        formatter: '{b}<br>{c} ({d}%)'
      },
      series: [{
        name: 'pie',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        radius: [60, '90%'],
        label: {
          normal: {
            position: 'inner',
            textStyle: {
              fontSize: 14,
              fontWeight: 700,
              color: '#000'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: '#336cfb'
            }
          }
        },
        data:[
          { value: 347, name: '0-10' },
          { value: 310, name: '10-20' },
          { value: 234, name: '20-30' },
          { value: 195, name: '30-40' },
          { value: 670, name: '40+' }
        ],
        itemStyle: this.pieStyle
      }]
    };
  }

  setPGOptions() {
    this.pgOptions = {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      tooltip : {
        trigger: 'item',
        formatter: '{b}<br>{c} ({d}%)'
      },
      series: [{
        name: 'pie',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        radius: [0, '90%'],
        label: {
          normal: {
            position: 'inner',
            textStyle: {
              fontSize: 14,
              fontWeight: 700,
              color: '#000'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: '#336cfb'
            }
          }
        },
        data:[
          { value: 154, name: 'Female' },
          { value: 173, name: 'Male' }
        ],
        itemStyle: this.pieStyle
      }]
    };
  }

  setDOptions() {
    this.dOptions = {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      tooltip : {
        trigger: 'item',
        formatter: '{b}<br>{c} ({d}%)'
      },
      series: [{
        name: 'pie',
        type: 'pie',
        radius: [0, '90%'],
        roseType : 'area',
        label: {
          normal: {
            show: false
          }
        },
        data:[
          { value: 115, name: 'Cardiology' },
          { value: 173, name: 'Dentistry' },
          { value: 154, name: 'Laboratory' },
          { value: 180, name: 'Pulmonology' },
          { value: 219, name: 'Gynecology' }
        ],
        itemStyle: this.pieStyle
      }]
    };
  }

  setPIOptions() {
    this.piOptions = {
      color: ['#ed5564'],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        boundaryGap: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          name: 'Patients 2019',
          type: 'line',
          smooth: true,
          data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226],
          areaStyle: {}
        }
      ]
    };
  }

  setHEOptions() {
    this.heOptions = {
      color: ['#64B5F6'],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        boundaryGap: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          name: 'Patients 2019',
          type: 'line',
          smooth: true,
          data: [94, 111, 90, 85, 70, 83, 94, 109, 89, 74, 83, 78],
          areaStyle: {}
        }
      ]
    };
  }
}
