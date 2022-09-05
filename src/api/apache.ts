import {
  DynamicApacheDataJsonReturn,
  DynamicApacheTableJsonReturn,
} from './APItype'
import http from './index'

export const getemojiJson = () =>
  http.get<DynamicApacheDataJsonReturn>('/dashboard/getDynamicApacheDataJson')

export const gettableJson = () =>
  http.get<DynamicApacheTableJsonReturn>('/dashboard/getDynamicApacheTableJson')
