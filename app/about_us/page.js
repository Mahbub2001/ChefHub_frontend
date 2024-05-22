import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to ChefHub! We are a team of passionate food enthusiasts dedicated to bringing you the best recipes and culinary events from around the world.
      </p>
      <p className="text-lg mb-4">
        Our mission is to inspire and empower people to explore the art of cooking, discover new flavors, and connect with others who share their love for food.
      </p>
      <p className="text-lg mb-4">
        At ChefHub, you'll find a diverse collection of recipes curated by our team of expert chefs, along with information about upcoming culinary events and gatherings.
      </p>
      <p className="text-lg mb-4">
        Whether you're a seasoned chef or just starting out on your culinary journey, we hope ChefHub will become your go-to destination for all things food-related.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">John Doe</h3>
          <p className="text-lg text-gray-600">Founder & CEO</p>
          <p className="mt-4">John is a passionate chef with over 10 years of experience in the culinary industry. He founded ChefHub with the vision of creating a community where food lovers could come together to share their love for cooking.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
