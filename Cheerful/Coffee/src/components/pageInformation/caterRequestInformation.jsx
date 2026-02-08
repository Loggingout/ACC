import { useState } from "react";
import { Calendar } from "lucide-react";
import ScheduleCaterButton from "../buttons/ScheduleCaterButton";
import ScheduleCater404Modal from "../modal/scheduleCater404Modal";

export default function CaterRequestInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
      {/* Glass container */}
      <div className="relative rounded-2xl p-6 sm:p-10 min-h-[260px] flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start gap-3">
          <h1 className="font-semibold bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Rated 5 stars all year round
          </h1>
        </div>

        {/* Middle row */}
        <div className="flex items-start gap-2 mt-5">
          <p className="text-white/80 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Where customer service and quality of our coffee exceed expectations.
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex justify-end mt-10">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white/80 hidden sm:block" />
            <ScheduleCaterButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* "Coming Soon" Modal */}
      {isModalOpen && (
        <ScheduleCater404Modal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
