import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import ProductItem from "../product/ProductItem";
import Metadata from "../Metadata";
import Loader from "../Loader";
import Navbar from "./Navbar";
import Navcard from "./Navcard";
import data from '../../data/Data'
import HeroSlider from "./HeroSlider";
import Heading from "./Heading";
import HotAccessorries from "./HotAccessorries";
import Offer from "./Offer";
import SpecialProducts from "./SpecialProducts";


function Home() {
  const { data: productData, loading } = useSelector((state) => state.products);
 
  const [category, setCategory] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllProducts({
        keyword: "",
        page: 1,
        category: "",
        price: [0, 1000000000000000000],
        ratingValue: 0,
      })
    );
  }, [dispatch]);

  const handleShowProduct = (cat) => {
    setCategory(cat)
    console.log(cat);
  }
  return (
    <>
      {" "}
      <Metadata title="eccomerce-Home" />

      <Navbar handleShowProduct={handleShowProduct} />


      <div className="flex flex-wrap justify-evenly items-center md:px-8 bg-white shadow-sm border-b border-gray-100 bg-gray-50 gap-4">
        {
          data[category]?.map((items) => {
            return (
              <Navcard
                name={items.name}
                image={items.image}
                price={items.price}
              />
            );
          })
        }
      </div>


      <HeroSlider />


      {/* <Heading text="STAR PRODUCTS" /> */}


    
      <Offer/>

      <Heading text="HOT ACCESSORIES" />

      <HotAccessorries />


      <Heading text="FEATURED COLLECTIONS" />


      <div className="min-h-[88vh] flex items-center justify-center py-4 container mx-auto">
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {productData?.map((product) => {
                return <ProductItem product={product} key={product._id} />;
              })}

            </div>
          </>
        )}
      </div>


      <Heading text="SPECIAL PRODUCTS" />

      <SpecialProducts product={productData}/>

     

    </>
  );
}

export default Home;
