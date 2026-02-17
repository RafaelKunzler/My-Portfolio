import React from 'react'
import { useEffect, useState } from 'react';

import { ChevronDown } from 'lucide-react'
import MessageCard from './MessageCard';


const Guestbook = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });

  const [messages, setMessages] = useState([])

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) {
          throw new Error("Failed to load messages");
        }

        const data = await res.json();
        if (isMounted) {
          setMessages(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isMounted) {
          setMessages([]);
        }
      }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.message) {
      return
    }

    const newMessage = {
      name: formData.name,
      date: new Date(),
      message: formData.message
    }

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) {
        throw new Error("Falha ao enviar mensagem");
      }

      const data = await res.json();
      const savedMessage = data?.message ?? newMessage;

      setMessages(prevMessages => [savedMessage, ...prevMessages]);
      setFormData({
        name: "",
        message: ""
      });
    } catch (error) {
      alert("Oops. We failed.");
    }
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
              <textarea required className="card py-2" id="message" placeholder="Deixe sua mensagem..." name="message" value={formData.message} onChange={handleChange} />
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
          <MessageCard key={msg._id ?? `${msg.name}-${msg.date}-${msg.message}`} name={msg.name} date={msg.date} message={msg.message} />
        ))}

      </div>
    </div>
  )
}

export default Guestbook
