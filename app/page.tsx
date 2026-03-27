import Button from "./ui/layout/button";
import Navbar from "./ui/layout/navbar";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-(--color-secondary) text-(--color-contrast)">

        {/* Hero */}
        <section className="bg-(--color-primary) text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Handcrafted Haven
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover unique, handmade creations while supporting artisans and sustainable living.
          </p>
          <div className="flex justify-center gap-4">
            {/* <button onClick={navigate} className="bg-(--color-accent) text-white px-6 py-3 rounded-lg hover:opacity-90">
              Browse Products
            </button> */}
            <Button action="navigate" navigateUrl="login" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-(--color-primary) cursor-pointer">
              Become a Seller
            </Button>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Jewelry", "Home Decor", "Art", "Clothing"].map((category) => (
              <Button action="navigate" navigateUrl={`/category/${category.replace(" ", "-").toLowerCase()}`} key={category} 
              className="p-6 bg-white border border-(--color-secondary) rounded-xl text-center hover:shadow-lg transition cursor-pointer">
                <p className="text-lg font-medium">{category}</p>
              </Button>
            ))}
          </div>
        </section>

        {/* Support banner */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-xl mb-2 text-(--color-primary)">
                Support Artisans
              </h3>
              <p>Empowering creators to share their craft with the world.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2 text-(--color-primary)">
                Sustainable Shopping
              </h3>
              <p>Encouraging eco-friendly and ethical consumption.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2 text-(--color-primary)">
                One-of-a-Kind Finds
              </h3>
              <p>Every product is unique and handcrafted with care.</p>
            </div>
          </div>
        </section>

        {/* How it works section - this describes the process of ordering an item from the shop works */}
        <section className="py-16 px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {["Browse", "Connect", "Purchase"].map((step, i) => (
              <div key={step}>
                <p className="text-2xl font-bold mb-2 text-(--color-accent)">
                  {i + 1}
                </p>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join section */}
        <section className="bg-(--color-accent) text-white py-16 text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Join the Handmade Movement
          </h2>
          <p className="mb-6">
            Be part of a community that values creativity and sustainability.
          </p>
          <Button action="navigate" navigateUrl="join" className="bg-white text-(--color-accent) px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            Get Started
          </Button>
        </section>

      </main>
    </>
  );
}