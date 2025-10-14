import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);



function ShoppingCartProvider({children}){

    const [loading,setLoading] = useState(true)
    const [listofProducts,setListofProducts]= useState([])
    const [productDetails,setProductDetails]= useState(null);
    const [cartItem,setCartItem]=useState([]);
    


    const navigate = useNavigate()


    async function FetchListOfProducts(){

        const apiResponse = await fetch('https://dummyjson.com/products')

        const result = await apiResponse.json()

        console.log(result);
        if(result && result?.products){
            setListofProducts(result?.products);
            setLoading(false)
        }
        
        
        
        

    }

    function handleAddToCart(getProductDetails){

        console.log(getProductDetails);
        
        let cpyExistingCartItem =[...cartItem];

        const findIndexofCurrentItem = cpyExistingCartItem.findIndex(cartItem=> cartItem.id === getProductDetails.id)
        console.log(findIndexofCurrentItem)
        if(findIndexofCurrentItem === -1){
            cpyExistingCartItem.push({
                ...getProductDetails,
                quantity : 1,
                totalPrice : getProductDetails?.price,
            })
        }else{

            console.log("its here");
            cpyExistingCartItem[findIndexofCurrentItem]={
                ...cpyExistingCartItem[findIndexofCurrentItem],
                quantity : cpyExistingCartItem[findIndexofCurrentItem].quantity + 1,
                totalPrice : (cpyExistingCartItem[findIndexofCurrentItem].quantity + 1)* cpyExistingCartItem[findIndexofCurrentItem].price 
            }

            
            
        }
        console.log(cpyExistingCartItem);
        setCartItem(cpyExistingCartItem)
        localStorage.setItem('cartItem',JSON.stringify(cpyExistingCartItem))

        navigate('/cart-list')
    }   

 
    function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart){
        let cpyExistingCartItem = [...cartItem];
        const findIndexoffCurrentItem = cpyExistingCartItem.findIndex(item=> item.id === getProductDetails.id)
        if(isFullyRemoveFromCart){
            cpyExistingCartItem.splice(findIndexoffCurrentItem , 1)
        }else{
            cpyExistingCartItem[findIndexoffCurrentItem]={
                ...cpyExistingCartItem[findIndexoffCurrentItem],
                quantity : cpyExistingCartItem[findIndexoffCurrentItem].quantity - 1,
                totalPrice : (cpyExistingCartItem[findIndexoffCurrentItem].quantity - 1)* cpyExistingCartItem[findIndexoffCurrentItem].price 
            }
        }
        localStorage.setItem('cartItem',JSON.stringify(cpyExistingCartItem))
        setCartItem(cpyExistingCartItem);
    }

        useEffect(() => {
            FetchListOfProducts();
             try {
                    const storedCart = JSON.parse(localStorage.getItem('cartItem') || "[]");
                     setCartItem(storedCart);
            } catch {
            setCartItem([]);
             }
            }, []);


    return (
    <ShoppingCartContext.Provider value={{listofProducts ,loading,setLoading,productDetails,setProductDetails,cartItem,setCartItem,handleAddToCart,handleRemoveFromCart}}>
        {children}
    </ShoppingCartContext.Provider>
    
    )
}
export default ShoppingCartProvider