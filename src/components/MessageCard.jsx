import React from 'react'

const MessageCard = ({name, date, message}) => {
  return (
    <div className='card'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-bold'>{name}</h1>
        <p className='text-muted'>{date}</p>
      </div>
      <p className='mt-3 text-wrap'>{message}</p>
    </div>
  )
}

export default MessageCard