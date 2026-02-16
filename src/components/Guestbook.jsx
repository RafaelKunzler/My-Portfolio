import React from 'react'
import { useState } from 'react';

import { ChevronDown } from 'lucide-react'



const Guestbook = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);

    
    
  }


  return (
    <div className="card hover:border-darkslate-200 mx-40 mt-6">
      <div className="flex justify-between">
        <h1 className="font-black">Deixe sua mensagem</h1>
        <ChevronDown />
      </div>

      <div className="">
        <form className='flex flex-col gap-4 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1 '>
            <label htmlFor="name" className='font-bold'>Nome</label>
            <input className="card py-2 " id="name" type="text" placeholder="Seu Nome" name="name" value={formData.name} onChange={handleChange}/>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="message" className='font-bold'>Mensagem</label>
            <textarea className="card py-2" id="name" placeholder="Deixe sua mensagem..." name="message" value={formData.message} onChange={handleChange}/>
          </div>

          <button className='w-full bg-primary-500 p-2 rounded-2xl font-bold hover:bg-primary-700 hover:cursor-pointer' type='submit'>
            Enviar
          </button>
        </form>

      </div>
    </div>
  )
}

export default Guestbook