import { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";
import {useHttp} from "../../hooks/httpHook";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {Theme as am5themes_Animated} from "@amcharts/amcharts5";
import './OnlineGraph.css';

export const OnlineGraph = ({ url, fieldName, id, header, deviceId }) => {
    const { loading, request } = useHttp();

    useLayoutEffect(() => {
        let root = am5.Root.new(id);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const data = [
            {
                date: 0,
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

        let container = chart.plotContainer.children.push(am5.Container.new(root, {}));
        let circle0 = container.children.push(am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000)
        }));
        let circle1 = container.children.push(am5.Circle.new(root, {
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
            let lastDataItem = series.dataItems[series.dataItems.length - 1];
            let point = lastDataItem.get("point");
            if (point) {
                container.setAll({
                    x: point.x,
                    y: point.y
                })
            }
        });

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis
        }));
        cursor.lineY.set("visible", false);
        chart.appear(1000, 100);

        setInterval(async function() {
            await addData();
        }, 3000)


        async function addData() {
            console.log(deviceId)
            const fetched = await request(url);
            const updPoints = fetched.map(item => {
                return {
                    date: item.id,
                    value: parseInt(item[fieldName])
                }
            })

            for (let i = 0; i < updPoints.length; i++) {
                series.data.push({
                    date: updPoints[i].date,
                    value: updPoints[i].value
                })
            }
        }

        return () => {
            root.dispose();
        };
    }, []);



    return (
    <div>
        <div className={"graph-element-header"}>{header}</div>
        <div className={"graph-element"} id={id} style={{ width: "50%", height: "500px" }}></div>
    </div>
)
}