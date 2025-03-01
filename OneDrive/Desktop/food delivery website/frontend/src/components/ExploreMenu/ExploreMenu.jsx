import React, { useState } from "react";
import "./ExploreMenu.css";
import { assets, menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu items based on search query
  const filteredMenu = menu_list.filter((item) =>
    item.menu_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
      Satisfy your cravings with our delicious fresh Dishes. Treat yourself to our mouthwatering desserts and cakes. Explore our menu and enjoy every bite! 🍽️✨
      </p>

      {/* Search Bar */}
      <div className="search-container">
  <img src={assets.search_icon} alt="" className="search-icon" />
  <input
    type="text"
    className="search-input"
    placeholder="Search menu..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>


      <div className="explore-menu-list">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))
              }
              className="explore-menu-list-items"
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No items found!</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
