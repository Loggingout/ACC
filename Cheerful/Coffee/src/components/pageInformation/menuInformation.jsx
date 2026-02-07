import MenuCards from "../menu/menuCards";
import { coffeeMenu, lunchMenu, fridgeMenu } from "../pageInformation/menuInformation/menuInformation"; // adjust path if needed
import { Coffee, Utensils, Box } from "lucide-react"; // import lucide icons

export default function MenuInformation() {
  return (
    <div className="menu-information px-4 sm:px-6 md:px-8 py-8">
      
      {/* Header */}
      <h1 className="menu-title text-3xl font-bold mb-2">Our Menu</h1>
      <p className="menu-description text-gray-700 mb-8">
        Discover our delicious selection of coffee and treats, crafted with love and the finest ingredients.
      </p>

      {/* Coffee Menu Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Coffee className="w-6 h-6 text-orange-500" />
          Coffee
        </h2>
        <MenuCards menu={coffeeMenu} />
      </section>

      {/* Lunch Menu Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Utensils className="w-6 h-6 text-yellow-500" />
          Lunch
        </h2>
        <MenuCards menu={lunchMenu} />
      </section>

      {/* Fridge Menu Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Box className="w-6 h-6 text-blue-500" />
          Fridge Items
        </h2>
        <MenuCards menu={fridgeMenu} />
      </section>

    </div>
  );
}
