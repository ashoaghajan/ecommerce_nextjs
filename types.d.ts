type Product = {
    details: string,
    image: {
        asset:{
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

interface ProductItem extends Product{
    qty: number,
}

type BannerData = {
    buttonText: string,
    desc: string,
    discount: string,
    image: {
        _type: 'image', 
        asset:{
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

type StateContext = {
    showCart: boolean;
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: ProductItem[];
    handleAddProduct: (product: Product, qty: number) => void
    total: {
        price: number;
        qty: number;
    };
    qty: number;
    incrementQty: () => void;
    decrementQty: () => void;
    changeCartItemQty: (id: string, type: 'inc' | 'dec') => void
    handleRemoveProduct: (id: string) => void
}