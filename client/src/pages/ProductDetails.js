import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/ProductDetailsStyles.css";
import ReactImageMagnify from 'react-image-magnify';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imgId, setImgId] = useState(1);

  const handleClick = (event, id) => {
    event.preventDefault();
    setImgId(id);
  };
  // useEffect(() => {
  //   const slideImage = () => {
  //     const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
  //     document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  //   };

  //   window.addEventListener('resize', slideImage);
  //   return () => {
  //     window.removeEventListener('resize', slideImage);
  //   };
  // }, [imgId]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="card-wrapper">
        <div className="card">
          {/* card left */}
          <div className="product-imgs">
            {/* <div className="img-display"> */}
              <div className="img-showcase">
                <ReactImageMagnify {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: `/a${imgId}.png`
                  },
                  largeImage: {
                    src: `/a${imgId}.png`,
                    width: 2000,
                    height: 3000
                  }
                }} />
                {/* <img src={`/a${imgId}.png`} alt="shoe image" /> */}
                {/* <img src="/a2.png" alt="shoe image" />
                <img src="/a3.png" alt="shoe image" />
                <img src="/a4.png" alt="shoe image" /> */}
              </div>
            {/* </div> */}
            <div className="img-select">
              <div className="img-item">
                <a href="#" data-id={1} onClick={(event) => handleClick(event, 1)}>
                  <img src="/a1.png" alt="shoe image" />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id={2} onClick={(event) => handleClick(event, 2)}>
                  <img src="/a2.png" alt="shoe image" />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id={3} onClick={(event) => handleClick(event, 3)}>
                  <img src="/a3.png" alt="shoe image" />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id={4} onClick={(event) => handleClick(event, 4)}>
                  <img src="/a4.png" alt="shoe image" />
                </a>
              </div>
            </div>
          </div>
          {/* card right */}
          <div className="product-content">
            <h2 className="product-title">nike shoes</h2>
            <a href="#" className="product-link">visit nike store</a>
            <div className="product-rating">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
              "..."
              <span>4.7(21)</span>
            </div>
            <div className="product-price">
              <p className="last-price">Old Price: <span>$257.00</span></p>
              <p className="new-price">New Price: <span>$249.00 (5%)</span></p>
            </div>
            <div className="product-detail">
              <h2>about this item: </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
              <ul>
                <li>Color: <span>Black</span></li>
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>Shoes</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Shipping Fee: <span>Free</span></li>
              </ul>
            </div>
            <div className="purchase-info">
              <input type="number" min={0} defaultValue={1} />
              <button type="button" className="btn">
                Add to Cart <i className="fas fa-shopping-cart" />
              </button>
              <button type="button" className="btn">Compare</button>
            </div>
            <div className="social-links">
              <p>Share At: </p>
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
              <a href="#">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="#">
                <i className="fab fa-pinterest" />
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </Layout>
  );
};

export default ProductDetails;