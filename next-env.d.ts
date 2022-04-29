/// <reference types="next" />
/// <reference types="next/image-types/global" />

type Product = {
    details: string,
    image: {
        assets:{
            _ref: string,
            _type: string
        },
        _key: string,
        _type: string,
    }[]
    name: string,
    price: number,
    slug: {
        _type: string, 
        current: string,
    }
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
}

type BannerData = {
    buttonText: string,
    desc: string,
    discount: string,
    image: {
        _type: 'image', 
        assets:{
            _ref: string,
            _type: string
        },
    },
    largeText1: string,
    largeText2: string,
    midText: string,
    product: string,
    saleTime: string,
    smallText: string,
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}
