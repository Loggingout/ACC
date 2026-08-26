import { CartProvider } from "../contexts/CartContext";
import { BannerProvider } from "../contexts/BannerContext";
import { AuthProvider } from "../features/account/state/AuthContext";

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <BannerProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </BannerProvider>
        </AuthProvider>
    )
}