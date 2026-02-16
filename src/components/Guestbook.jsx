import React from 'react'
import { useState } from 'react';

import { ChevronDown } from 'lucide-react'
import MessageCard from './MessageCard';


const Guestbook = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });

  const [messages, setMessages] = useState([{
    name: "Ana Clara",
    date: "Fevereiro 16, 2026",
    message: "Adorei o site! Dá pra ver o carinho em cada detalhe. Sucesso demais pra você!"
  },
  {
    name: "Lucas Martins",
    date: "Fevereiro 8, 2026",
    message: "Que ideia massa esse mural! Já me senti assinando o caderno da escola 😂"
  }
  ])



  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!formData.name || !formData.message){
      return
    }

    const newMessage ={
      name: formData.name,
      date: "Fevereiro 6, 2026",
      message: formData.message
    }
    setMessages(prevMessages => [newMessage, ...prevMessages])

   setFormData({
    name: "",
    message: ""
   })
    

  }


  return (
    <div className=' mx-40 '>
      <div className="card hover:border-darkslate-200 mt-6">
        <div className="flex justify-between">
          <h1 className="font-black">Deixe sua mensagem</h1>
          <ChevronDown />
        </div>

        <div className="">
          <form className='flex flex-col gap-4 mt-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1 '>
              <label htmlFor="name" className='font-bold'>Nome</label>
              <input required className="card py-2 " id="name" type="text" placeholder="Seu Nome" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="message" className='font-bold'>Mensagem</label>
              <textarea required className="card py-2" id="name" placeholder="Deixe sua mensagem..." name="message" value={formData.message} onChange={handleChange} />
            </div>

            <button className='w-full bg-primary-500 p-2 rounded-2xl font-bold hover:bg-primary-700 hover:cursor-pointer' type='submit'>
              Enviar
            </button>
          </form>

        </div>
      </div>

      <h1 className='my-6 font-bold text-2xl'>Mensagens({messages.length})</h1>
      <div className='flex flex-col gap-2'>
        {messages.map((msg) => (
          <MessageCard name={msg.name} date={msg.date} message={msg.message} />
        ))}
        
      </div>
    </div>
  )
}

export default Guestbook