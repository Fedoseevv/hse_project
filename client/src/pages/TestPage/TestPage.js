import { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";


import {useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/httpHook";


// export const TestPage = (props) => {
//     const { loading, request } = useHttp();
//     const chart = useRef(null);
//
//     const [allData, setAllData] = useState([])
//     const [ pulse, setPulse ] = useState([]);
//
//     const getData = useCallback(async () => {
//         const fetched = await request('/api/monitoring/all', 'GET');
//         setAllData(fetched);
//         const pulseFetched = fetched.map(item => parseInt(item.pulse));
//         setPulse(pulseFetched);
//         // getMaxId()
//     }, [])
//     useEffect(async () => {
//         await getData()
//     }, [getData])
//
//     useLayoutEffect(() => {
//       let x = am4core.create("chartdiv", am4charts.XYChart);
//
//       x.paddingRight = 20;
//
//       let data = [];
//       let visits = 10;
//
//     //   for (let i = 1; i < 366; i++) {
//     //     visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//     //     data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
//     //   }
//
//       for (let i = 0; i < allData.length; i++) {
//           console.log(allData[i])
//           // new Date(Date.parse(allData[i].current_ts)).toLocaleTimeString()
//         data.push({ date: allData[i].current_ts, value: allData[i].pulse });
//       }
//
//       x.data = data;
//
//       let dateAxis = x.xAxes.push(new am4charts.DateAxis());
//       dateAxis.baseInterval = {
//           "timeUnit": "second",
//           "count": 1
//       }
//       dateAxis.renderer.grid.template.location = 0;
//
//       let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
//       valueAxis.tooltip.disabled = true;
//       valueAxis.renderer.minWidth = 35;
//
//       let series = x.series.push(new am4charts.LineSeries());
//       series.dataFields.dateX = "date";
//       series.dataFields.valueY = "value";
//       series.tooltipText = "{valueY.value}";
//
//       // define scrollbar
//       x.cursor = new am4charts.XYCursor();
//       let scrollbarX = new am4charts.XYChartScrollbar();
//       scrollbarX.series.push(series);
//       x.scrollbarX = scrollbarX;
//
//       chart.current = x;
//
//       return () => {
//         x.dispose();
//       };
//     }, []);
//
//     const addPoint = () => {
//         console.log('click')
//     }
//
//     useLayoutEffect(() => {
//         console.log(chart.current.paddingRight)
//         chart.current.paddingRight = props.paddingRight;
//         // { date: points[i].x, value: points[i].y }
//         // chart.current.addData({date: points[points.length - 1].x, value: points[points.length - 1].y}, 1, true);
//     }, [props.paddingRight, allData]);
//
//     return (
//       <>
//           <div id="chartdiv" style={{width: "100%", height: "500px"}}/>
//           <button onClick={addPoint}>click</button>
//       </>
//     );
// }

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {Theme as am5themes_Animated} from "@amcharts/amcharts5";

export const TestPage = () => {

    const { loading, request } = useHttp();
    const [value, setValue] = useState(100)
    // const [data, setData] = useState(generateChartData());

    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const data = [
            {
                date: 620,
                value: 1,
            }
        ]

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        let easing = am5.ease.linear;

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.5,
            groupData: true,
            extraMax: 0.1, // this adds some space in front
            extraMin: -0.1,  // this removes some space form th beginning so that the line would not be cut off
            baseInterval: {
                timeUnit: "second",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 70
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        let series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "{valueY}"
            })
        }));

        series.data.setAll(data);

        var container = chart.plotContainer.children.push(am5.Container.new(root, {}));
        var circle0 = container.children.push(am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000)
        }));
        var circle1 = container.children.push(am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000)
        }));

        circle1.animate({
            key: "radius",
            to: 20,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity
        });
        circle1.animate({
            key: "opacity",
            to: 0,
            from: 1,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity
        });

        root.events.on("framestarted", function() {
            var lastDataItem = series.dataItems[series.dataItems.length - 1];
            var point = lastDataItem.get("point");
            if (point) {
                container.setAll({
                    x: point.x,
                    y: point.y
                })
            }
        });

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis
        }));
        cursor.lineY.set("visible", false);
        chart.appear(1000, 100);

        setInterval(async function() {
            await addData();
        }, 3000)


        async function addData() {
            const fetched = await request(`/api/monitoring/last3s`);
            const updPoints = fetched.map(item => {
                return {
                    date: item.id,
                    value: parseInt(item.pulse)
                }
            })
            // add data to the main data set
            let mainDataSet = series._mainDataItems;
            let lastDataItem = mainDataSet[mainDataSet.length - 1];

            // let lastValue = lastDataItem.get("valueY");
            // let newValue = value + ((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
            // let lastDate = new Date(lastDataItem.get("valueX"));
            // let time = am5.time.add(new Date(lastDate), "second", 1).getTime();
            //series.data.removeIndex(0);
            for (let i = 0; i < updPoints.length; i++) {
                series.data.push({
                    date: updPoints[i].date,
                    value: updPoints[i].value
                })
            }
            // series.data.push({
            //     date: time,
            //     value: newValue
            // })
        }

        return () => {
            root.dispose();
        };
    }, []);



    return (
    <>
        <div id="chartdiv" style={{ width: "50%", height: "500px" }}></div>
    </>
)
}