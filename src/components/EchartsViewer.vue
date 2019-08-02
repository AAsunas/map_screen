<template>
    <div>
        <!--左-->
        <div class="chart-left-box">
            <div id="ChartLeftOne" class="chart-left"></div>
            <div id="ChartLeftTwo" class="chart-left"></div>
            <div id="ChartLeftThree" class="chart-left"></div>
            <div id="ChartLeftFour" class="chart-left">
                <div id="ChartLeftFour_l" class="chart-left-four"></div>
                <div id="ChartLeftFour_r" class="chart-left-four"></div>
            </div>
        </div>
        <!--中-->
        <div id="ChartCenter" class="chart-center-box"></div>
        <!--右-->
        <div class="chart-right-box">
            <div id="ChartRightOne" class="chart-right"></div>
            <div id="ChartRightTwo" class="chart-right"></div>
            <div id="ChartRightThree" class="chart-right"></div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: 'EchartsViewer',
    data () {
        return {
            
        }
    },
    created(){},
    mounted(){
        // 获取宽高
        let chartLeftHeight = ($(window).height()-220)/4;
        $('.chart-left').height(chartLeftHeight);
        let chartRightHeight = ($(window).height()-190)/3;
        $('.chart-right').height(chartRightHeight);
        // 中间图表
        let chartCenterwidth = $(window).width()-770; 
        $('.chart-center-box').offset({top: ($(window).height() - chartLeftHeight -30)});
        $('.chart-center-box').width(chartCenterwidth);
        $('.chart-center-box').height(chartLeftHeight);
        // 实例化chart
        this.ChartLeftOne();
        this.ChartLeftTwo();
        this.ChartLeftThree();
        this.ChartLeftFour();
        this.ChartRightOne();
        this.ChartRightTwo();
        this.ChartRightThree();
        this.ChartCenter();
    },
    methods: {
        ChartLeftOne(){
            let ChartLeftOne = this.$echarts.init(document.getElementById('ChartLeftOne'));
            // 绘制图表
            ChartLeftOne.setOption({
                tooltip : {
                    trigger: 'axis',
                    axisPointer : { // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top:'20%',
                    left: '1%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis:  {
                    show : false,
                    type: 'value',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    show : false,
                    type: 'category',
                    data: ['数据1','数据2','数据3'],
                    axisLine: {       //y轴
                        show: false
                    },
                    axisTick: {       //y轴刻度线
                        show: false
                    },
                    splitLine: {     //网格线
                        show: false
                    }
                },
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                //show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            color: '#356fa8'
                        },
                        data: [320, 302, 301]
                    },
                    {
                        name: '邮件营销',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                //show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            color: '#29abe2'
                        },
                        data: [120, 132, 101]
                    },
                    {
                        name: '联盟广告',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 8,
                        label: {
                            normal: {
                                //show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            color: '#26eafd'
                        },
                        data: [220, 182, 191]
                    }
                ]
            });
        },
        ChartLeftTwo(){
            let ChartLeftTwo = this.$echarts.init(document.getElementById('ChartLeftTwo'));
            let dataBJ = [
                [55,9,56,0.46,18,6,1],
                [25,11,21,0.65,34,9,2],
                [56,7,63,0.3,14,5,3],
                [33,7,29,0.33,16,6,4],
                [42,24,44,0.76,40,16,5],
                [82,58,90,1.77,68,33,6],
                [74,49,77,1.46,48,27,7],
                [78,55,80,1.29,59,29,8],
                [267,216,280,4.8,108,64,9],
                [185,127,216,2.52,61,27,10],
                [39,19,38,0.57,31,15,11],
                [41,11,40,0.43,21,7,12],
                [64,38,74,1.04,46,22,13],
                [108,79,120,1.7,75,41,14],
                [108,63,116,1.48,44,26,15],
                [33,6,29,0.34,13,5,16],
                [94,66,110,1.54,62,31,17],
                [186,142,192,3.88,93,79,18],
                [57,31,54,0.96,32,14,19],
                [22,8,17,0.48,23,10,20],
                [39,15,36,0.61,29,13,21],
                [94,69,114,2.08,73,39,22],
                [99,73,110,2.43,76,48,23],
                [31,12,30,0.5,32,16,24],
                [42,27,43,1,53,22,25],
                [154,117,157,3.05,92,58,26],
                [234,185,230,4.09,123,69,27],
                [160,120,186,2.77,91,50,28],
                [134,96,165,2.76,83,41,29],
                [52,24,60,1.03,50,21,30],
                [46,5,49,0.28,10,6,31]
            ];
            let dataGZ = [
                [26,37,27,1.163,27,13,1],
                [85,62,71,1.195,60,8,2],
                [78,38,74,1.363,37,7,3],
                [21,21,36,0.634,40,9,4],
                [41,42,46,0.915,81,13,5],
                [56,52,69,1.067,92,16,6],
                [64,30,28,0.924,51,2,7],
                [55,48,74,1.236,75,26,8],
                [76,85,113,1.237,114,27,9],
                [91,81,104,1.041,56,40,10],
                [84,39,60,0.964,25,11,11],
                [64,51,101,0.862,58,23,12],
                [70,69,120,1.198,65,36,13],
                [77,105,178,2.549,64,16,14],
                [109,68,87,0.996,74,29,15],
                [73,68,97,0.905,51,34,16],
                [54,27,47,0.592,53,12,17],
                [51,61,97,0.811,65,19,18],
                [91,71,121,1.374,43,18,19],
                [73,102,182,2.787,44,19,20],
                [73,50,76,0.717,31,20,21],
                [84,94,140,2.238,68,18,22],
                [93,77,104,1.165,53,7,23],
                [99,130,227,3.97,55,15,24],
                [146,84,139,1.094,40,17,25],
                [113,108,137,1.481,48,15,26],
                [81,48,62,1.619,26,3,27],
                [56,48,68,1.336,37,9,28],
                [82,92,174,3.29,0,13,29],
                [106,116,188,3.628,101,16,30],
                [118,50,0,1.383,76,11,31]
            ];
            let dataSH = [
                [91,45,125,0.82,34,23,1],
                [65,27,78,0.86,45,29,2],
                [83,60,84,1.09,73,27,3],
                [109,81,121,1.28,68,51,4],
                [106,77,114,1.07,55,51,5],
                [109,81,121,1.28,68,51,6],
                [106,77,114,1.07,55,51,7],
                [89,65,78,0.86,51,26,8],
                [53,33,47,0.64,50,17,9],
                [80,55,80,1.01,75,24,10],
                [117,81,124,1.03,45,24,11],
                [99,71,142,1.1,62,42,12],
                [95,69,130,1.28,74,50,13],
                [116,87,131,1.47,84,40,14],
                [108,80,121,1.3,85,37,15],
                [134,83,167,1.16,57,43,16],
                [79,43,107,1.05,59,37,17],
                [71,46,89,0.86,64,25,18],
                [97,71,113,1.17,88,31,19],
                [84,57,91,0.85,55,31,20],
                [87,63,101,0.9,56,41,21],
                [104,77,119,1.09,73,48,22],
                [87,62,100,1,72,28,23],
                [168,128,172,1.49,97,56,24],
                [65,45,51,0.74,39,17,25],
                [39,24,38,0.61,47,17,26],
                [39,24,39,0.59,50,19,27],
                [93,68,96,1.05,79,29,28],
                [188,143,197,1.66,99,51,29],
                [174,131,174,1.55,108,50,30],
                [187,143,201,1.39,89,53,31]
            ];
            let lineStyle = {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            };
            ChartLeftTwo.setOption({
                radar: {
                    indicator: [
                        {name: 'AQI', max: 300},
                        {name: 'PM2.5', max: 250},
                        {name: 'PM10', max: 300},
                        {name: 'CO', max: 5},
                        {name: 'NO2', max: 200},
                        {name: 'SO2', max: 100}
                    ],
                    shape: 'circle',
                    splitNumber: 5,
                    name: {
                        show: false,
                        textStyle: {
                            color: 'rgb(1, 255, 250)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: [
                                'rgba(1, 255, 250, 0.1)', 'rgba(1, 255, 250, 0.2)',
                                'rgba(1, 255, 250, 0.4)', 'rgba(1, 255, 250, 0.6)',
                                'rgba(1, 255, 250, 0.8)', 'rgba(1, 255, 250， 1)'
                            ].reverse()
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(1, 255, 250, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        name: '北京',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataBJ,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: 'rgb(1, 255, 250)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        }
                    },
                    {
                        name: '上海',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataSH,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: 'rgb(1, 255, 250)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.05
                            }
                        }
                    },
                    {
                        name: '广州',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: dataGZ,
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: 'rgb(1, 255, 250)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.05
                            }
                        }
                    }
                ]
            });
        },
        ChartLeftThree(){
            let data = [
                [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
                [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
            ];
            let ChartLeftThree = this.$echarts.init(document.getElementById('ChartLeftThree'));
            ChartLeftThree.setOption({
                grid: {
                    top:'20%',
                    left: '1%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    show:false,
                    splitLine: { 
                        show: false
                    }
                },
                yAxis: {
                    show:false,
                    scale: true,
                    splitLine: { 
                        show: false
                    }
                },
                series: [{
                    name: '1990',
                    data: data[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 18e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: 'rgb(161, 125, 246)'
                        }
                    }
                }, {
                    name: '2015',
                    data: data[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 18e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(25, 100, 150, 0.5)',
                            shadowOffsetY: 5,
                            color: 'rgb(129, 227, 238)'
                        }
                    }
                }]
            });
        },
        ChartLeftFour(){
            let ChartLeftFour_l = this.$echarts.init(document.getElementById('ChartLeftFour_l'));
            let ChartLeftFour_r = this.$echarts.init(document.getElementById('ChartLeftFour_r'));
            ChartLeftFour_l.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: 'right'
                },
                series: [
                    {
                        hoverAnimation:false, 
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {
                                value:335, 
                                name:'直接访问',
                                itemStyle: {
                                    color: '#2a3695'
                                },
                            },{
                                value:310, 
                                name:'邮件营销',
                                itemStyle: {
                                    color: '#9f7df6'
                                },  
                            },{
                                value:234, 
                                name:'联盟广告',
                                itemStyle: {
                                    color: '#2cceec'
                                },
                            },{
                                value:1548, 
                                name:'搜索引擎',
                                itemStyle: {
                                    color: '#4fa5f7'
                                },
                            }
                        ]
                    }
                ]
            });
            ChartLeftFour_r.setOption({
               tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        hoverAnimation:false, 
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {
                                value:335, 
                                name:'直接访问',
                                itemStyle: {
                                    color: '#2a3695'
                                },
                            },{
                                value:1548, 
                                name:'邮件营销',
                                itemStyle: {
                                    color: '#9f7df6'
                                },  
                            },{
                                value:234, 
                                name:'联盟广告',
                                itemStyle: {
                                    color: '#2cceec'
                                },
                            },{
                                value:60, 
                                name:'搜索引擎',
                                itemStyle: {
                                    color: '#4fa5f7'
                                },
                            }
                        ]
                    }
                ] 
            });
        },
        ChartRightOne(){
            let ChartRightOne = this.$echarts.init(document.getElementById('ChartRightOne'));
            ChartRightOne.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '1%',
                    right: '4%',
                    bottom: '40px',
                    containLabel: true
                },
                xAxis: {
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    axisLine: {       //y轴
                        show: false
                    },
                    axisTick: {       //y轴刻度线
                        show: false
                    },
                    splitLine: {     //网格线
                        show: false
                    }
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        smooth: true,
                        itemStyle: {
                            color: '#41648a'
                        },
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        smooth: true,
                        itemStyle: {
                            color: '#09707c'
                        },
                        data:[220, 182, 191, 234, 290, 250, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        smooth: true,
                        itemStyle: {
                            color: '#02b58a'
                        },
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        smooth: true,
                        itemStyle: {
                            color: '#61af14'
                        },
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        smooth: true,
                        itemStyle: {
                            color: '#29abe2'
                        },
                        data:[-120, -20, -150, -154, -90, -180, -30]
                    }
                ]
            })
        },
        ChartRightTwo(){
            let ChartRightTwo = this.$echarts.init(document.getElementById('ChartRightTwo'));
            ChartRightTwo.setOption({
                dataset: {
                    source: [
                        ['product', '2015', '2016', '2017'],
                        ['Matcha Latte', 43.3, 85.8, 93.7],
                        ['Milk Tea', 83.1, 73.4, 55.1],
                        ['Cheese Cocoa', 86.4, 65.2, 82.5],
                        ['Walnut Brownie', 72.4, 53.9, 39.1]
                    ]
                },
                xAxis: {
                    type: 'category',
                    show : false,
                },
                yAxis: {
                    show : false,
                },
                series: [
                    {
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            color: '#2e3192'
                        },
                    },{
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            color: '#0071bc'
                        },
                    },{
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            color: '#29abe2'
                        },
                    }
                ]
            });
        },
        ChartRightThree(){
            let ChartRightThree = this.$echarts.init(document.getElementById('ChartRightThree'));
            ChartRightThree.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}%"
                },
                series: [
                    {
                        name: '金字塔',
                        type:'funnel',
                        width: '40%',
                        itemStyle: {
                            borderWidth: 0
                        },
                        data:[
                            {
                                value: 60,
                                name: '访问',
                                itemStyle: {
                                    color: '#0070bc'
                                },
                            },
                            {
                                value: 30, 
                                name: '咨询',
                                itemStyle: {
                                    color: '#2d3293'
                                },
                            },
                            {
                                value: 10, 
                                name: '订单',
                                itemStyle: {
                                    color: '#4fa5f7'
                                },
                            },
                            {
                                value: 80, 
                                name: '点击',
                                itemStyle: {
                                    color: '#a27cf6'
                                },
                            },
                            {
                                value: 100, 
                                name: '展现',
                                itemStyle: {
                                    color: '#29abe2'
                                },
                            }
                        ]
                    }
                ]
            });
        },
        ChartCenter(){
            let ChartCenter = this.$echarts.init(document.getElementById('ChartCenter'));
            ChartCenter.setOption({
                grid: {
                    top:'20%',
                    left: '1%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    splitLine: { 
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#343434'
                        }                            
                    },
                },
                yAxis: {
                    show: true,
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#343434'
                        }                            
                    },
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    itemStyle: {
                        color: '#00ffff'
                    },
                }]
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.chart-left-box {
    width: 300px;
    position: absolute;
    top: 100px;
    left: 30px;
    z-index: 999;
    .chart-left {
        margin-top: 30px;
        width: 100%;
        background-image: url('../assets/echarts/layer_two.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    #ChartLeftOne {
        margin-top: 0;
    }
    #ChartLeftFour {
        display: flex;
        .chart-left-four {
            flex: 1;
            width: 50%;
            height: 100%;
        }
    }
}
.chart-right-box {
    width: 350px;
    position: absolute;
    top: 100px; 
    right: 30px;
    z-index: 999;
    .chart-right {
        margin-top: 30px;
        width: 100%;
        background-image: url('../assets/echarts/layer_three.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    #ChartRightOne {
        margin-top: 0;
    }
}
.chart-center-box {
    position: absolute;
    border: 1px solid #00ffff;
    left: 360px;
    z-index: 999;
}
</style>