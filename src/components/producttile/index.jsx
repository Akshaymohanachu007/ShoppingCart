import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductTile({SingleProductTile}){

    const {handleAddToCart,cartItem}=useContext(ShoppingCartContext)

        const Navigate = useNavigate()

        function HandleNavigateToproductListPage(getCurrentProductId,navigate){

            console.log(getCurrentProductId);
            Navigate(`/product-Details/${getCurrentProductId}`)
            
            
        }
    return ( 
    <div className="relative group border border-cyan-700 p-6 cursor-pointer ">
        <div className="overflow-hidden aspect-w-1 aspect-h-1">
            <img src={SingleProductTile?.thumbnail} 
            alt={SingleProductTile?.title} 
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
            />

        </div>
        <div className="flex items-start justify-between mt-4 space-x-4">
            <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
                <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{SingleProductTile?.title}</p>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]" >${SingleProductTile?.price}</p>
            </div>
        </div>
        <button onClick={()=> HandleNavigateToproductListPage(SingleProductTile?.id)} className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg">
            View Details
        </button>
        <button onClick={()=>handleAddToCart(SingleProductTile)} disabled={cartItem.findIndex(item=> item.id === SingleProductTile?.id) > -1}  className="disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg">
            Add To Cart
        </button>
    </div>
    )
}
export default ProductTile