import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import Upload from './components/Upload'

export const history = createBrowserHistory({ window })
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        {/* <App /> */}
        <Upload></Upload>
      </ConfigProvider>
    </Provider>
  </HistoryRouter>
)
