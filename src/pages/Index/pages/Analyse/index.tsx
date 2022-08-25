import classNames from 'classnames'
import echarts from '../../../../echart'
import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

type MyLineEcharts = { name: string; value: (string | number)[] }[]
const Analyse = () => {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (divRef.current && divRef.current.offsetHeight > 0) {
      let data: MyLineEcharts = []
      let now = new Date(1997, 9, 3)
      let oneDay = 24 * 3600 * 1000
      let value = Math.random() * 1000
      const randomData = () => {
        now = new Date(+now + oneDay)
        value = value + Math.random() * 21 - 10
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value),
          ],
        }
      }
      for (var i = 0; i < 1000; i++) {
        data.push(randomData())
      }

      const myEcharts = echarts.init(divRef.current, undefined, {})

      myEcharts.setOption({
        title: {
          text: '访问量',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: true,
          },
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: '假数据',
            type: 'line',
            showSymbol: false,
            data: data,
          },
        ],
      })
      setInterval(function () {
        for (var i = 0; i < 5; i++) {
          data.shift()
          data.push(randomData())
        }
        myEcharts.setOption({
          series: [
            {
              data: data,
            },
          ],
        })
      }, 200)
    }
  }, [])
  return <div className={classNames(styles.root)} ref={divRef}></div>
}

export default Analyse
