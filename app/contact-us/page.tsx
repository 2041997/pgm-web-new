"use client"
import BottomBanner from '@/components/home/BottomBanner'
import BottomCard from '@/components/home/BottomCard'
import Image from 'next/image'
import React from 'react'
import contact from '../../public/contactpage.jpg'

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-sm text-emerald-500">How can help you ?</div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">Let us know how we can help you</h1>
            <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <div className="font-medium text-gray-800">01. Visit Feedback</div>
                <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo tellus, luctus nec ullamcorper mattis.</p>
              </div>
              <div>
                <div className="font-medium text-gray-800">02. Employer Services</div>
                <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo tellus, luctus nec ullamcorper mattis.</p>
              </div>
              <div>
                <div className="font-medium text-gray-800">03. Billing Inquiries</div>
                <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo tellus, luctus nec ullamcorper mattis.</p>
              </div>
              <div>
                <div className="font-medium text-gray-800">04. General Inquiries</div>
                <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo tellus, luctus nec ullamcorper mattis.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="h-56 md:h-64 rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363155047!3d-37.81627974202179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f8c7b1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1717670000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Offices grid */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Office', addr: '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA', phone: '(123) 456-7890', email: 'contact@evara.com' },
            { name: 'Studio', addr: '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA', phone: '(123) 456-7890', email: 'contact@evara.com' },
            { name: 'Shop', addr: '205 North Michigan Avenue, Suite 810\nChicago, 60601, USA', phone: '(123) 456-7890', email: 'contact@evara.com' },
          ].map((o) => (
            <div key={o.name} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-emerald-500 font-semibold">{o.name}</h3>
              <p className="mt-3 text-sm text-gray-600 whitespace-pre-line">{o.addr}</p>
              <p className="mt-3 text-sm text-gray-600">Phone: {o.phone}</p>
              <p className="text-sm text-gray-600">Email: {o.email}</p>
              <button className="mt-4 inline-block bg-emerald-500 text-white px-4 py-2 rounded-md">View map</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form + image */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800">Contact form</h3>
            <h2 className="text-2xl font-semibold mt-2">Drop Us a Line</h2>
            <p className="text-sm text-gray-500 mt-2">Your email address will not be published. Required fields are marked *</p>

            <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border border-gray-200 rounded-md px-4 py-3" placeholder="First Name" />
              <input className="border border-gray-200 rounded-md px-4 py-3" placeholder="Your Email" />
              <input className="border border-gray-200 rounded-md px-4 py-3" placeholder="Your Phone" />
              <input className="border border-gray-200 rounded-md px-4 py-3" placeholder="Subject" />
              <textarea className="col-span-1 md:col-span-2 border border-gray-200 rounded-md px-4 py-3 h-40" placeholder="Message" />
              <button className="bg-emerald-800 text-white px-5 py-3 rounded-md">Send message</button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image src={contact} alt="contact" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>


      {/* Icons strip */}
    <BottomBanner />

      <BottomCard />
    </main>
  )
}
