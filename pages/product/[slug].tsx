import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';


interface ProductDetailsProps {
    product: Product;
    similarProducts: Product[];
}
 
const ProductDetails: React.FC<ProductDetailsProps> = ({ product, similarProducts }) => {

    const { image, name, details, price } = product;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { decrementQty, incrementQty, qty, handleAddProduct }: StateContext = useStateContext();

    return ( 
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="img-container">
                        <img src={String(urlFor(image?.[selectedIndex]))||''} alt="product" 
                            className='product-detail-image'/>
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, index) => (
                            <img src={String(urlFor(item))} key={index} alt={index + 'img'} 
                                className={selectedIndex === index 
                                    ? 'small-image selected-image' 
                                    : 'small-image'
                                }
                                onMouseEnter={() => setSelectedIndex(index)}/>
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/ >
                            <AiFillStar/ >
                            <AiFillStar/ >
                            <AiFillStar/ >
                            <AiOutlineStar/ >
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details</h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decrementQty}><AiOutlineMinus/></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incrementQty}><AiOutlinePlus/></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type='button' className='add-to-cart' 
                            onClick={() => handleAddProduct(product, qty)}>
                            Add to Cart
                        </button>
                        <button type='button' className='buy-now'>
                            But now
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {similarProducts?.map(item => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticPaths = async() => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((item: Product) => ({
        params: {
            slug: item.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking'
    };
}

export const getStaticProps = async({ params: { slug } }: any) => {
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const product = await client.fetch(productQuery);
    const similarProductsQuery = `*[_type == "product"]`;
    const similarProducts = await client.fetch(similarProductsQuery);
    return {
      props: { product, similarProducts },
    }
}
 
export default ProductDetails;