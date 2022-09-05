import axios from 'axios'

export const getemojiJson = () =>
  axios.get('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json', {
    proxy: {
      protocol: 'https',
      host: 'https://fastly.jsdelivr.net',
      port: 80,
    },
  })

export const gettableJson = () =>
  axios.get(
    'https://echarts.apache.org/examples/data/asset/data/life-expectancy-table.json',
    {
      proxy: {
        protocol: 'https',
        host: 'https://echarts.apache.org',
        port: 80,
      },
    }
  )
