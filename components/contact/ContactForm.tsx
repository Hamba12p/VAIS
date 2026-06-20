'use client';

import { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Submit to Formspree endpoint
    const endpoint = 'https://formspree.io/f/xdavqjap';
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        setSent(true);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to send message. Please try again or call us directly.');
      });
  }

  if (sent) {
    return <div className="p-6 bg-vais-surface rounded-vais">Thanks — we'll be in touch.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-vais-slate">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border border-vais-border rounded-vais p-2" />
      </div>
      <div>
        <label className="block text-sm text-vais-slate">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-vais-border rounded-vais p-2" />
      </div>
      <div>
        <label className="block text-sm text-vais-slate">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full border border-vais-border rounded-vais p-2" rows={5} />
      </div>
      <div>
        <button type="submit" className="inline-flex items-center px-4 py-2 bg-vais-green text-white rounded-vais">Send</button>
      </div>
    </form>
  );
}
