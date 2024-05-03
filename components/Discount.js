import React from 'react'

const Discount = () => {
  return (
    <div>
      
      <div className="relative">
  {/* Fading background image */}
  <div className="absolute inset-0 bg-gray-800 " />

  <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-white">
    {/* Sale message */}
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Get 25% off during our one-time sale</h1>
      <p className="text-lg md:text-xl">Most of our products are limited releases that won't come back. Get your favorite items while they're in stock.</p>
    </div>

    {/* Access to sale */}
    <div className="text-center mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-2">Get access to our one-time sale</h2>
    </div>

    {/* Testimonials */}
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-lg md:text-xl">What are people saying?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="border border-gray-600 rounded-md p-6">
          <p className="text-lg">My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!</p>
          <p className="text-sm mt-4">Sarah Peters, New Orleans</p>
        </div>
        {/* Testimonial 2 */}
        <div className="border border-gray-600 rounded-md p-6">
          <p className="text-lg">I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!</p>
          <p className="text-sm mt-4">Kelly McPherson, Chicago</p>
        </div>
        {/* Testimonial 3 */}
        <div className="border border-gray-600 rounded-md p-6">
          <p className="text-lg">Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.</p>
          <p className="text-sm mt-4">Chris Paul, Phoenix</p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Discount
