import React from 'react'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MessageCard = ({name, date, message}) => {
  const parsedDate = date ? new Date(date) : null;
  const formattedDate = parsedDate && !Number.isNaN(parsedDate.getTime())
    ? format(parsedDate, "PPP", { locale: ptBR })
    : "";

  return (
    <div className='card'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-bold'>{name}</h1>
        <p className='text-muted'>{formattedDate}</p>
      </div>
      <p className='mt-3 text-wrap'>{message}</p>
    </div>
  )
}

export default MessageCard
