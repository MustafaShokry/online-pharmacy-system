import React, { useContext, useEffect, useState } from 'react';
import { FetchWishlistContext } from './../../../Context/WishList';
import Product from '../Product/Product';

export default function WishList() {
    const { wishlist } = useContext(FetchWishlistContext);
    const [wish, setWish] = useState([]);
    useEffect(() => {
        if (Array.isArray(wishlist)) {
            const transformedWish = wishlist
                .filter(item => item && item._id)  // Check item exists and has _id
                .map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category,
                    bestSeller: item.bestSeller,
                    offer: item.offer,
                    description: item.description,
                    image: item.image,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                }));
            setWish(transformedWish);
        }
    }, [wishlist]);
    
    
    

    return (
        <>
            
            <Product categoryProducts={wish} categoryName={"Wish List"} />

        </>
    );
}
