import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

interface ProductProps {
    product: Product
}
 
const Product: React.FC<ProductProps> = ({ product }) => {

    const { image, name, slug, price } = product;

    return ( 
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <img src={String(urlFor(image?.[0]))} alt="product-image"
                        className='product-image' width={250} height={250}
                    />
                    <p className="product-name">{name}</p>
                    <p className="product-price">${price}</p>
                </div>
            </Link>
        </div>
    );
}
 
export default Product;