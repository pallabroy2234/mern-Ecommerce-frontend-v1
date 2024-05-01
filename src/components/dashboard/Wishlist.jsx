import {useEffect, useState} from "react";
import {AiFillHeart, AiOutlineShoppingCart} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import Rattings from "../Rattings.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getWishList, messageClear, removeWishlist} from "../../store/reducers/cartReducer.js";

import toast from "react-hot-toast";
import {FadeLoader} from "react-spinners";

const Wishlist = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.auth);
	const {wishListProducts, errorMessage, successMessage, loader} = useSelector((state) => state.cart);
	const [activeWishlistItems, setActiveWishlistItems] = useState([]);

	useEffect(() => {
		if (userInfo) {
			dispatch(getWishList(userInfo.id));
		}
	}, []);



	const handleAddToCart = (id) => {
		if (userInfo) {
			dispatch(
				addToCart({
					userId: userInfo.id,
					quantity: 1,
					productId: id,
				}),
			);
		} else {
			navigate("/login");
		}
	};


	useEffect(() => {
		if (wishListProducts) {
			const wishlistItems = wishListProducts.map((item) => item?.productId);
			setActiveWishlistItems(wishlistItems);
		}
	}, [wishListProducts]);

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
	}, [successMessage, errorMessage]);

	const handleRemoveWishlist = (wishlistId) => {
		dispatch(removeWishlist(wishlistId));
	};



	const truncateName = (name) => {
		if (name.length > 40) {
			return name.substring(0, 40) + "...";
		}
		return name;
	};

	return (
		<div className='w-full grid grid-cols-4 xl:grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
			{loader && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			{wishListProducts &&
				wishListProducts?.map((item, index) => (
					<div key={index} className='group border transition-all duration-300 shadow-md hover:-translate-y-2  z-50 rounded-md bg-white'>
						{/* Product Image and Link */}
						<div className='relative overflow-hidden'>
							{item?.discount ? <div className='z-50 flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>-10%</div> : null}
							<div className='w-full h-[220px] overflow-hidden'>
								<img className='w-full h-full object-contain' src={item?.image} alt={item?.name} />
							</div>
							<ul className='z-50 flex transition-all duration-300 -bottom-10 justify-center items-center gap-3 absolute w-full group-hover:bottom-3 '>
								<li
									onClick={() => handleRemoveWishlist(item?._id)}
									className={`${activeWishlistItems.includes(item?.productId) ? "bg-dark-moderate-green text-white" : "bg-white text-black"} w-[38px] h-[38px] cursor-pointer  flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white  transition-all duration-200`}>
									<AiFillHeart />
								</li>
								<Link to={`/product/details/${item?.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
									<FaEye />
								</Link>
								<button onClick={() => handleAddToCart(item?.productId)}  type="button"  className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-dark-moderate-green hover:text-white hover:rotate-[720deg] transition-all duration-200'>
									<AiOutlineShoppingCart />
								</button>
							</ul>
							<div className='z-40 absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black  opacity-0 group-hover:opacity-20 transition-all'></div>
						</div>

						{/* Product Content */}
						<div className='py-3 text-slate-600 px-2'>
							<h2>{truncateName(item?.name)}</h2>
							<div className='flex justify-start items-center gap-3'>
								<span className='text-lg font-bold'>${item?.price}</span>
								<div className='flex'>
									<Rattings rattings={item?.ratting} />
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
};
export default Wishlist;
