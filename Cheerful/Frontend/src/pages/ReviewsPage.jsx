import { useEffect, useRef, useState } from "react";

function GoogleReviewsWidget() {
  const widgetRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = widgetRef.current;
    const container = document.createElement("div");
    container.id = "JFWebsiteWidget-01a21476e5507000827399938f078f393c08";
    host.appendChild(container);

    const script = document.createElement("script");
    script.src = "https://www.jotform.com/website-widgets/embed/01a21476e5507000827399938f078f393c08";
    script.async = true;
    script.onerror = () => setFailed(true);
    document.head.appendChild(script);

    return () => {
      script.onerror = null;
      script.remove();
      container.remove();
    };
  }, []);

  return (
    <section aria-labelledby="google-reviews-heading" className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 id="google-reviews-heading" className="text-3xl font-bold mb-6 text-center text-white">Google Reviews</h2>
      <div ref={widgetRef} />
      {failed && <p role="status" className="text-white text-center">Google reviews could not be loaded right now.</p>}
    </section>
  );
}

export default function ReviewsPage() {
  return <GoogleReviewsWidget />;
}
