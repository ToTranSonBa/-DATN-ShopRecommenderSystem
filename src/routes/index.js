import { HeaderOnly } from '../layouts/index';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import SellerDashboard from '../pages/ShopDashboardPage/index';
import CartShoppingPage from '../pages/CartsShoppingPage/CartShoppingPage';
import UserPage from '../pages/UserPage/UserPage';
import ShopPage from '../pages/ShopPage';
import CheckoutForm from '../pages/CheckoutForm/CheckoutForm';
import AdminDoashBoardManager from '../pages/AdminDoashboard';
import SellerSignUp from '../pages/ShopDashboardPage/signup';

import withAuth from '../HOC/withAuth'; // Adjust the import path as needed

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage, layout: HeaderOnly },
    { path: '/signup', component: SignUpPage, layout: HeaderOnly },
    { path: '/productpage', component: ProductsPage },
    { path: '/productdetail/:id', component: ProductDetailPage },
    { path: '/shoppage/:id', component: ShopPage },
    { path: '/signup/seller', component: SellerSignUp, layout: HeaderOnly },
];

const protectedRoutes = [
    { path: '/shopdashboard', component: withAuth(SellerDashboard, ['Seller']), layout: HeaderOnly },
    { path: '/cartshoppingpage', component: withAuth(CartShoppingPage, ['Customer', 'Seller']) },
    { path: '/userpage', component: withAuth(UserPage, ['Customer', 'Seller']) },
    { path: '/checkout', component: withAuth(CheckoutForm, ['Customer', 'Seller']) },
    { path: '/admin', component: withAuth(AdminDoashBoardManager, ['Admintrator']), layout: HeaderOnly },
];

export { publicRoutes, protectedRoutes };
