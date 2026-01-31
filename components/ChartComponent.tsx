'use client';

import React, { useEffect, useRef } from 'react';
import {
    createChart,
    ColorType,
    IChartApi,
    ISeriesApi,
    SeriesType,
    AreaSeries,
    BarSeries,
    CandlestickSeries,
    BaselineSeries,
    LineSeries
} from 'lightweight-charts';

interface ChartComponentProps {
    data: any[]; // Data for the series
    type?: 'Area' | 'Bar' | 'Candlestick' | 'Baseline' | 'Line';
    colors?: {
        backgroundColor?: string;
        lineColor?: string;
        textColor?: string;
        areaTopColor?: string;
        areaBottomColor?: string;
        upColor?: string;
        downColor?: string;
    };
    height?: number;
}

export default function ChartComponent({
    data,
    type = 'Area',
    colors = {},
    height = 300
}: ChartComponentProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        const {
            backgroundColor = 'transparent',
            lineColor = '#2962FF',
            textColor = '#D1D1D1',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
            upColor = '#26a69a',
            downColor = '#ef5350',
        } = colors;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: height,
            grid: {
                vertLines: { color: 'rgba(42, 46, 57, 0.1)' },
                horzLines: { color: 'rgba(42, 46, 57, 0.1)' },
            },
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 0.1)',
            },
            rightPriceScale: {
                borderColor: 'rgba(197, 203, 206, 0.1)',
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
            },
        });

        chartRef.current = chart;

        let series: ISeriesApi<SeriesType>;

        if (type === 'Area') {
            series = chart.addSeries(AreaSeries, {
                lineColor,
                topColor: areaTopColor,
                bottomColor: areaBottomColor,
            });
        } else if (type === 'Bar') {
            series = chart.addSeries(BarSeries, {
                upColor,
                downColor,
                openVisible: true,
                thinBars: true,
            });
        } else if (type === 'Candlestick') {
            series = chart.addSeries(CandlestickSeries, {
                upColor,
                downColor,
                borderVisible: false,
                wickUpColor: upColor,
                wickDownColor: downColor,
            });
        } else if (type === 'Baseline') {
            series = chart.addSeries(BaselineSeries, {
                baseValue: { type: 'price', price: typeof data[0]?.value === 'number' ? data[0].value : 0 },
                topLineColor: upColor,
                bottomLineColor: downColor,
            });
        } else {
            // Default line
            series = chart.addSeries(LineSeries, {
                color: lineColor,
            });
        }

        series.setData(data);
        chart.timeScale().fitContent();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, type, colors, height]);

    return (
        <div
            ref={chartContainerRef}
            className="w-full relative rounded-xl overflow-hidden border border-[#262626] bg-[#0D0D0D]"
        />
    );
}
