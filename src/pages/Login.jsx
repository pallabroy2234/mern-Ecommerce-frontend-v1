import Headers from "../components/Headers.jsx";
import Footer from "../components/Footer.jsx";
import {FaFacebookF} from "react-icons/fa";
import {AiOutlineGooglePlus} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {messageClear, userLogin} from "../store/reducers/authReducer.js";
import {FadeLoader} from "react-spinners";
import toast from "react-hot-toast";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {loader, successMessage, userInfo, errorMessage} = useSelector((state) => state.auth);

	const [state, setState] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(userLogin(state));
	};

	useEffect(() => {
		if (successMessage) {
			toast.success(successMessage);
			dispatch(messageClear());
			navigate("/");
		}
		if (errorMessage) {
			toast.error(errorMessage);
			dispatch(messageClear());
		}
		if (userInfo) {
			navigate("/");
		}
	}, [successMessage, errorMessage]);

	return (
		<div>
			{loader && (
				<div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
					<FadeLoader />
				</div>
			)}
			<Headers />
			{/* Register */}
			<div className='mt-4 bg-slate-200'>
				<div className='items-center justify-center w-full p-10 sm:p-5'>
					<div className='w-[500px] md:w-auto sm:w-full mx-auto bg-white rounded-md'>
						<div className='p-8 sm:p-5'>
							<h2 className='w-full text-xl font-bold text-center text-slate-600'>Login</h2>
							{/* Register Section */}
							<div>
								<form onSubmit={(e) => handleSubmit(e)} className='text-slate-600'>
									<div className='flex flex-col gap-1 mb-3'>
										<label htmlFor='email'>Email</label>
										<input onChange={(e) => handleChange(e)} type='email' id='email' name='email' placeholder='Email' className='w-full px-3 py-2 border rounded-md border-slate-200 outline-0 focus:border-indigo-500' />
									</div>

									<div className='flex flex-col gap-1 mb-4'>
										<label htmlFor='password'>Password</label>
										<input onChange={(e) => handleChange(e)} type='password' id='password' name='password' placeholder='Password' className='w-full px-3 py-2 border rounded-md border-slate-200 outline-0 focus:border-indigo-500' />
									</div>

									<button className='w-full px-8 py-2 text-white bg-purple-500 rounded-md shadow-lg hover:shadow-purple-500/30'>Login</button>
								</form>
								<div className='flex items-center justify-center py-2'>
									<div className='h-[1px] bg-slate-300 w-[95%]'></div>
									<span className='px-3 text-slate-600'>or</span>
									<div className='h-[1px] bg-slate-300 w-[95%]'></div>
								</div>

								{/* Login with facebook */}
								<button className='flex items-center justify-center w-full gap-2 px-8 py-2 mb-4 text-white bg-indigo-500 rounded-md shadow-lg hover:shadow-indigo-500/30'>
									<span>
										<FaFacebookF />
									</span>
									<span className='overflow-hidden text-base capitalize sm:text-sm whitespace-nowrap text-ellipsis'>Login With Facebook</span>
								</button>
								{/* Login with google */}
								<button className='flex items-center justify-center w-full gap-2 px-8 py-2 mb-4 text-white bg-orange-500 rounded-md shadow-lg hover:shadow-orange-500/30'>
									<span>
										<AiOutlineGooglePlus />
									</span>
									<span className='overflow-hidden text-base capitalize sm:text-sm whitespace-nowrap text-ellipsis'>Login With Google</span>
								</button>
							</div>

							{/*  Already Account redirect to user login page   */}
							<div className='pt-1 text-center text-slate-600'>
								<p>
									You don't have an account?{" "}
									<Link to={"/register"} className='text-blue-500'>
										Register
									</Link>
								</p>
								<p>
									<a className='pr-1 text-blue-500' target='_blank' href='https://mern-ecommerce-dashboard-v1.onrender.com/login'>
										Login
									</a>
									Seller Account
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default Login;
