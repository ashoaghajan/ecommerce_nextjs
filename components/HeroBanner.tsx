import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';

interface HeroBannerProps {
    heroBanner: BannerData
}
 
const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {

    const { smallText, midText, buttonText, desc, largeText1, image, product } = heroBanner;

    return ( 
        <div className='hero-banner-container'>
            <div>
                <p className="beats-solo">{smallText}</p>
                <h3>{midText}</h3>
                <h1>{largeText1}</h1>
                <img src={String(urlFor(image))} alt="headphones" className='hero-banner-image' />
                <div>
                    <Link href={`/product/${product}`}>
                        <button type='button'>{buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default HeroBanner;