// ComingSoonPage.jsx — reusable placeholder for features that aren't wired up yet
export default function ComingSoonPage({ icon: Icon, title, message }) {
  return (
    <div className="flex items-center justify-center py-16 sm:py-24">
      <div className="relative overflow-hidden bg-black/40 rounded-2xl shadow-xl max-w-md w-full text-center px-6 sm:px-10 py-10 sm:py-14">
        {Icon && (
          <div className="mx-auto mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500">
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h1>
        <p className="text-white/70 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
