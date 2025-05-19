import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send the form data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-5 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Contact Us
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about automata theory or need help using our project? 
            We're here to help! Reach out to us through any of the methods below.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-5">
                <Mail className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Feel free to email us with any questions</p>
              <a 
                href="mailto:contact@automataproject.com" 
                className="text-blue-600 hover:text-blue-700 flex items-center group"
              >
                <span>contact@automataproject.com</span>
                <ArrowRight className="ml-1 h-4 w-0 group-hover:w-4 transition-all overflow-hidden opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-5">
                <Phone className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">Mon-Fri from 9am to 5pm</p>
              <a 
                href="tel:+1234567890" 
                className="text-indigo-600 hover:text-indigo-700 flex items-center group"
              >
                <span>+1 (234) 567-890</span>
                <ArrowRight className="ml-1 h-4 w-0 group-hover:w-4 transition-all overflow-hidden opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg hover:-translate-y-1">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-blue-50 p-4 rounded-full mb-5">
                <MapPin className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">University</h3>
              <p className="text-gray-600 mb-4">Come visit our campus</p>
              <address className="text-blue-600 not-italic">
                DBB-B, 4115 West Ave<br />
                Dasmariñas, Cavite<br />
                Philippines
              </address>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden mb-16 transition hover:shadow-lg">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600"></div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            
            {formSubmitted ? (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 text-green-700 p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Please select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MapPin className="text-blue-600 mr-2" size={20} />
            <span>Find Us</span>
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="p-4 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.9728589206017!2d120.95556327584532!3d14.327105585190974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDE5JzM3LjYiTiAxMjDCsDU3JzI3LjkiRQ!5e0!3m2!1sen!2sus!4v1617345714772!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;