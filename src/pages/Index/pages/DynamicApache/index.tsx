import echarts from '../../../../echart'
import { useEffect, useRef } from 'react'
import { getemojiJson, gettableJson } from '../../../../api/apache'
import styles from './index.module.scss'
import classNames from 'classnames'
interface Flag {
  name: string
  emoji: string
}
const updateFrequency = 2000
const dimension = 0

const countryColors: Record<string, string> = {
  Australia: '#00008b',
  Canada: '#f00',
  China: '#ffde00',
  Cuba: '#002a8f',
  Finland: '#003580',
  France: '#ed2939',
  Germany: '#000',
  Iceland: '#003897',
  India: '#f93',
  Japan: '#bc002d',
  'North Korea': '#024fa2',
  'South Korea': '#000',
  'New Zealand': '#00247d',
  Norway: '#ef2b2d',
  Poland: '#dc143c',
  Russia: '#d52b1e',
  Turkey: '#e30a17',
  'United Kingdom': '#00247d',
  'United States': '#b22234',
}
const Apache = () => {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    console.log(divRef.current, divRef.current!.offsetHeight)

    if (divRef.current && divRef.current.offsetHeight > 0) {
      getemojiJson().then((value1: any) => {
        console.log(value1, 'value')
        gettableJson().then((value2: any) => {
          console.log(value2, '2')
          value1.forEach((v: any) => {
            const data = value2[0]
            const flags: Flag[] = v
            let startIndex = 10
            let startYear = years[startIndex]
            const myEcharts = echarts.init(
              divRef.current as HTMLDivElement,
              undefined,
              {}
            )

            const getFlag = (countryName: string) => {
              if (!countryName) {
                return ''
              }
              return (
                flags.find(function (item) {
                  return item.name === countryName
                }) || {}
              ).emoji
            }
            for (let i = startIndex; i < years.length - 1; ++i) {
              ;(function (i) {
                setTimeout(function () {
                  updateYear(years[i + 1])
                }, (i - startIndex) * updateFrequency)
              })(i)
            }
            let option =
              // console.log(option);
              myEcharts.setOption({
                grid: {
                  top: 10,
                  bottom: 30,
                  left: 150,
                  right: 80,
                },
                xAxis: {
                  max: 'dataMax',
                  axisLabel: {
                    formatter: function (n: number) {
                      return Math.round(n) + ''
                    },
                  },
                },
                dataset: {
                  source: data.slice(1).filter(function (d: string[]) {
                    return d[4] === startYear
                  }),
                },
                yAxis: {
                  type: 'category',
                  inverse: true,
                  max: 10,
                  axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function (value: any) {
                      return value + '{flag|' + getFlag(value) + '}'
                    },
                    rich: {
                      flag: {
                        fontSize: 25,
                        padding: 5,
                      },
                    },
                  },
                  animationDuration: 300,
                  animationDurationUpdate: 300,
                },
                series: [
                  {
                    realtimeSort: true,
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    itemStyle: {
                      color: function (param: any) {
                        return (
                          countryColors[(param.value as number[])[3]] ||
                          '#5470c6'
                        )
                      },
                    },
                    encode: {
                      x: dimension,
                      y: 3,
                    },
                    label: {
                      show: true,
                      precision: 1,
                      position: 'right',
                      valueAnimation: true,
                      fontFamily: 'monospace',
                    },
                  },
                ],
                // Disable init animation.
                animationDuration: 0,
                animationDurationUpdate: updateFrequency,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                graphic: {
                  elements: [
                    {
                      type: 'text',
                      right: 160,
                      bottom: 60,
                      style: {
                        text: startYear,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)',
                      },
                      z: 100,
                    },
                  ],
                },
              })
            const updateYear = (year: string) => {
              let source = data.slice(1).filter(function (d: string[]) {
                return d[4] === year
              })
              ;(option as any).series[0].data = source
              ;(option as any).graphic.elements[0].style.text = year
            }
          })
        })
      })
      const years: string[] = []
    }
  }, [])
  return <div ref={divRef} className={classNames(styles.root)}></div>
}

export default Apache
