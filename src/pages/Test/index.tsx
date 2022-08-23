import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'
import React from 'react'

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
  current,
  pageSize
) => {
  console.log(current, pageSize)
}

const Test = () => {
  return (
    <>
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
      <br />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
        disabled
      />
    </>
  )
}

export default Test
