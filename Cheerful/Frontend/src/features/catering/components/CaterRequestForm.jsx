import { useState } from 'react';
import { Send } from 'lucide-react';
import { Toast } from '@animate-ui/react/primitives/base-ui/toast';
import { submitCateringRequest } from '../api/cateringApi';

const INITIAL_FORM = {
    businessName: '',
    businessEmail: '',
    name: '',
    phoneNumber: '',
    location: '',
    description: '',
    eventDate: '',
    eventTime: '',
    hoursNeeded: '2',
};

const fieldClass = 'block w-full min-w-0 max-w-full border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-0';
const labelClass = 'block text-xs font-semibold text-gray-800';

export default function CaterRequestForm() {
    const toast = Toast.useToastManager();
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('submitting');
        setError(null);

        try {
            await submitCateringRequest({
                ...Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])),
                hoursNeeded: Number(form.hoursNeeded),
            });
            setForm(INITIAL_FORM);
            setStatus('success');
            toast.add({ type: 'success', title: 'Request received', description: 'We will reach out within 2-4 hours.' });
        } catch (err) {
            setStatus('error');
            setError(err.message || 'Something went wrong submitting your request. Please try again.');
            toast.add({ type: 'error', title: 'Request not submitted', description: 'Please try again.' });
        }
    };

    if (status === 'success') {
        return (
            <div className="p-6 sm:p-10 lg:p-12" role="status">
                <p className="text-xs font-bold uppercase text-orange-600">Catering request</p>
                <h2 className="mt-4 font-serif text-3xl text-gray-950">Request received.</h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">Thanks for reaching out. We'll be in touch within 2-4 hours to discuss your event.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-6 border-b border-orange-500 pb-1 text-sm font-semibold text-gray-900">Send another request</button>
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
            <p className="text-xs font-bold uppercase text-orange-600">Let's get started</p>
            <h2 className="mt-3 font-serif text-3xl text-gray-950">Tell us about your event.</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                    <label htmlFor="businessName" className={labelClass}>Business name <span className="text-orange-600">*</span></label>
                    <input className={fieldClass} id="businessName" name="businessName" value={form.businessName} onChange={handleChange} placeholder="Your business name" maxLength={200} required />
                </div>
                <div>
                    <label htmlFor="name" className={labelClass}>Contact name <span className="text-orange-600">*</span></label>
                    <input className={fieldClass} id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" maxLength={200} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="businessEmail" className={labelClass}>Business email <span className="text-orange-600">*</span></label>
                        <input className={fieldClass} type="email" id="businessEmail" name="businessEmail" value={form.businessEmail} onChange={handleChange} placeholder="you@business.com" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className={labelClass}>Phone <span className="text-orange-600">*</span></label>
                        <input className={fieldClass} type="tel" id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="(555) 123-4567" maxLength={30} required />
                    </div>
                </div>
                <div>
                    <label htmlFor="location" className={labelClass}>Event address <span className="text-orange-600">*</span></label>
                    <input className={fieldClass} id="location" name="location" value={form.location} onChange={handleChange} placeholder="Where will we meet you?" maxLength={300} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="eventDate" className={labelClass}>Event date <span className="text-orange-600">*</span></label>
                        <input className={fieldClass} type="date" id="eventDate" name="eventDate" value={form.eventDate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="eventTime" className={labelClass}>Event time <span className="text-orange-600">*</span></label>
                        <input className={fieldClass} type="time" id="eventTime" name="eventTime" value={form.eventTime} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <label htmlFor="hoursNeeded" className={labelClass}>Hours needed <span className="text-orange-600">*</span></label>
                    <input className={fieldClass} type="number" id="hoursNeeded" name="hoursNeeded" min="2" max="168" step="0.5" value={form.hoursNeeded} onChange={handleChange} aria-describedby="hours-hint" required />
                    <p id="hours-hint" className="mt-1 text-xs text-gray-500">2-hour minimum</p>
                </div>
                <div>
                    <label htmlFor="description" className={labelClass}>Event details <span className="text-orange-600">*</span></label>
                    <textarea className={`${fieldClass} resize-y`} id="description" name="description" rows="3" value={form.description} onChange={handleChange} placeholder="Tell us about your event, guests, and catering needs" maxLength={2000} required />
                </div>
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={status === 'submitting'} className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-60">
                    {status === 'submitting' ? 'Submitting...' : 'Send request'} <Send size={15} aria-hidden="true" />
                </button>
            </form>
        </div>
    );
}