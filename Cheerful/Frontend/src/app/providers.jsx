import { CartProvider } from "../contexts/CartContext";
import { BannerProvider } from "../contexts/BannerContext";
import { AuthProvider } from "../features/account/state/AuthContext";
import { Toast } from "@animate-ui/react/primitives/base-ui/toast";
import { X } from "lucide-react";
import TrafficTracker from "../features/admin/analytics/TrafficTracker";

function ToastList() {
    const { toasts } = Toast.useToastManager();
    return toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className="absolute bottom-0 right-0 w-full rounded-lg border border-gray-200 bg-white text-gray-900 shadow-xl overflow-hidden">
            <Toast.Content className="flex items-start gap-4 p-4">
                <div className="min-w-0 flex-1">
                    <Toast.Title className="text-sm font-semibold" />
                    <Toast.Description className="mt-1 text-sm text-gray-600" />
                </div>
                <Toast.Close aria-label="Dismiss notification" className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                    <X size={16} />
                </Toast.Close>
            </Toast.Content>
        </Toast.Root>
    ));
}

export default function Providers({ children }) {
    return (
        <Toast.Provider>
            <AuthProvider>
                <BannerProvider>
                    <CartProvider>
                        <TrafficTracker />
                        {children}
                    </CartProvider>
                </BannerProvider>
            </AuthProvider>
            <Toast.Portal>
                <Toast.Viewport className="fixed bottom-4 right-4 z-[100] w-[calc(100vw-2rem)] sm:w-96">
                    <ToastList />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    )
}