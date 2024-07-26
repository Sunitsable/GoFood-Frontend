import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  // Function to load food items
  const loadFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Fetched food items:', data);
      setFoodItems(data[0] || []); // Assuming data is an array and the first item is the list of food items
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: '9' }}>
              <div className="d-flex justify-content-center">
                {/* Search box */}
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn text-white bg-danger" onClick={() => setSearch('')}>
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://media.istockphoto.com/photos/paneer-tikka-kabab-in-red-sauce-is-an-indian-dish-made-from-chunks-of-picture-id1257507446?b=1&k=20&m=1257507446&s=170667a&w=0&h=Nd7QsslbvPqOcvwu1bY0rEPZXJqwoKTYCal3nty4X-Y=" // Placeholder image
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="Food"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2018/03/23/08/27/thai-fried-rice-3253027__340.jpg" // Placeholder image
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="Food"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/photos/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-picture-id1186759790?k=20&m=1186759790&s=612x612&w=0&h=e9MlX_7cZtq9_-ORGLPNU27VNP6SvDz7s-iwTxrf7wU=" // Placeholder image
                className="d-block w-100"
                style={{ filter: 'brightness(30%)' }}
                alt="Food"
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {['Pizza', 'Starter', 'Biryani/Rice'].map((category) => (
          <div className="row mb-3" key={category}>
            <div className="fs-3 m-3">{category}</div>
            <hr
              id="hr-success"
              style={{
                height: '4px',
                backgroundImage: '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
              }}
            />
            {foodItems.length !== 0 ? (
              foodItems
                .filter((item) =>
                  item.CategoryName === category &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filteredItem) => (
                  <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                    <Card
                      foodName={filteredItem.name}
                      item={filteredItem}
                      options={filteredItem.options[0]}
                      ImgSrc={filteredItem.img || 'https://via.placeholder.com/150'} // Default image if none provided
                    />
                  </div>
                ))
            ) : (
              <div>No items available for this category.</div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
