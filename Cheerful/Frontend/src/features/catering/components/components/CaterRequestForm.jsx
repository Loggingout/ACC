import Logo from '../../../../../public/acc-logo.jpg';
import { Building2, Mail, User, Phone, MapPin, MessageSquare, Send, Gift } from 'lucide-react';

export default function CaterRequestForm() {
    return(
        <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <img src={Logo} alt="A Cheerful Cup Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-md" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
                Request for Us to Cater
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 text-center px-2">
                Please fill out the form below to request catering services for your event. We will get back to you within 24-48 hours to discuss your needs and provide a customized catering proposal.
            </p>
            
            <form className="space-y-4 sm:space-y-6">
                {/* Business Name */}
                <div>
                    <label htmlFor="businessName" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                        Business Name
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your business name"
                        required
                    />
                </div>

                {/* Business Email */}
                <div>
                    <label htmlFor="businessEmail" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                        Business Email
                    </label>
                    <input
                        type="email"
                        id="businessEmail"
                        name="businessEmail"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="business@example.com"
                        required
                    />
                </div>

                {/* Name and Phone - Two columns on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="(555) 123-4567"
                            required
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Event location address"
                        required
                    />
                </div>

                {/* Description of Area */}
                <div>
                    <label htmlFor="description" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                        Description of Area
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Please describe your event, number of attendees, specific catering needs, and any other relevant details..."
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Submit Request
                </button>

                {/* Confirmation Message */}
                <p className="text-center text-xs sm:text-sm md:text-base text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2 pb-4">
                    <span>You will receive an email 24-48 hours after submission</span>
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                </p>
            </form>
        </div>
    )
}