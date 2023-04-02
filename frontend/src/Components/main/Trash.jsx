import React from 'react'
import { useState } from 'react'
import '../../css/trash.css'
import { Empty } from './Empty'
export const Trash = () => {
  return (
    <Empty icon={'fa-regular fa-trash-can'} info={'trash is empty'}/>
  )
}
