/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ProductRating from "./ProductRating";
import ProductPricing from "./ProductPricing";

const defaultSeller = {
  iD_NK: 2926,
  iD_SK: 1,
  name: "Tiki Trading",
  isOfficial: true,
  storeLevel: null,
  avgRatingPoint: 4.6718,
  totalFollower: 500417,
  reviewCount: 5456753,
  imageUrl:
    "https://vcdn.tikicdn.com/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg",
  total: 1786,
  products: null,
};

const ProductCardSeller = ({
  product,
  image = null,
  sellerId,
  sellerName,
  sellerImg,
}) => {
  return (
    <div
      key={product.iD_NK}
      className="max-w-sm bg-white rounded-lg shadow-sm hover:shadow-lg hover:border hover:border-blue-700"
    >
      <a href={`/productdetail/${product.iD_NK}`}>
        {product.allTimeQuantitySold > 1000 && product?.brandID_NK ? (
          <div>
            <span className="absolute px-2 py-1 m-4 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
              ✓ Chính hãng
            </span>
            <span className="absolute px-2 py-1 mx-4 my-12 text-xs font-semibold text-orange-500 bg-orange-100 rounded">
              Bán chạy
            </span>
          </div>
        ) : (
          <></>
        )}

        {product?.brandID_NK ? (
          <div>
            <span className="absolute px-2 py-1 m-4 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
              ✓ Chính hãng
            </span>
          </div>
        ) : (
          <></>
        )}

        <img
          data-twe-lazy-load-init
          data-twe-lazy-src
          className="p-2 rounded-t-lg sm:p-4 h-72 m-auto"
          src={image ? image : product.image}
          alt="product image"
        />
      </a>
      <div className="items-baseline p-2 sm:p-5 align-bot">
        <a href={`/productdetail/${product.iD_NK}`}>
          <h3 className="h-[55px] text-sm font-semibold text-gray-900 sm:text-lg limit-text">
            {product.name}
          </h3>
        </a>
        <ProductRating
          ratingAverage={product.ratingAverage}
          allTimeQuantitySold={product.allTimeQuantitySold}
          sort={true}
        />

        <ProductPricing
          id={product.iD_NK}
          originalPrice={product.originalPrice}
          price={product.price}
        />
        <div className="w-full border-b-1 my-3"></div>
        <div className="flex flex-row content-center">
          <img
            src={sellerImg || defaultSeller.imageUrl}
            className="w-10 h-10 rounded-full"
          ></img>
          <div className="ml-2">
            <p className="w-full text-base h-6 font-medium limit-text">
              {sellerName || defaultSeller.name}
            </p>
            <div className="flex flex-row w-fit bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {/* {seller?.avgRatingPoint
                ? Math.round(seller.avgRatingPoint * 10) / 10
                : Math.round(defaultSeller.avgRatingPoint * 10) / 10} */}
              {Math.round(defaultSeller.avgRatingPoint * 10) / 10}
              <svg
                className="ml-[2px] w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSeller;
