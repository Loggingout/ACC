import CaterInformation from "../features/catering/components/caterInformation";
import CaterRequestForm from "../features/catering/components/CaterRequestForm";

export default function CaterPage() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_0.85fr]">
        <CaterInformation />
        <div id="catering-request" className="flex justify-center lg:items-center border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="w-full max-w-xl">
            <CaterRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}