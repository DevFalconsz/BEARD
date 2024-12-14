import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'

const BUSINESS_HOURS = {
  start: 9, // 9 AM
  end: 18, // 6 PM
}

const AppointmentForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [service, setService] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const appointmentDateTime = new Date(`${date}T${time}`)
    const formattedDate = format(appointmentDateTime, 'yyyy-MM-dd HH:mm:ss')

    const { data, error } = await supabase
      .from('appointments')
      .insert([
        { name, email, phone, appointment_date: formattedDate, service },
      ])

    if (error) {
      console.error('Error inserting appointment:', error)
      alert('Erro ao agendar. Por favor, tente novamente.')
    } else {
      alert('Agendamento realizado com sucesso!')
      setName('')
      setEmail('')
      setPhone('')
      setDate('')
      setTime('')
      setService('')
    }
  }

  const generateTimeSlots = () => {
    const slots: string[] = []; // Especifica que o array conterá strings
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };  

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefone"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      >
        <option value="">Selecione um horário</option>
        {generateTimeSlots().map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
      >
        <option value="">Selecione o serviço</option>
        <option value="corte">Corte de Cabelo</option>
        <option value="barba">Barba</option>
        <option value="combo">Combo (Corte + Barba)</option>
      </select>
      <button type="submit">Agendar</button>
    </form>
  )
}

export default AppointmentForm

