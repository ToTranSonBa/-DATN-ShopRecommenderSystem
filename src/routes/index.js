//Layouts
import { HeaderOnly } from '../layouts/index';
//page
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

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage, layout: HeaderOnly },
    { path: '/signup', component: SignUpPage, layout: HeaderOnly },
    { path: '/productpage', component: ProductsPage },
    { path: '/productdetail/:id', component: ProductDetailPage },
    { path: '/shopdashboard', component: SellerDashboard, layout: HeaderOnly },
    { path: '/cartshoppingpage', component: CartShoppingPage },
    { path: '/userpage', component: UserPage },
    { path: '/shoppage/:id', component: ShopPage },
    { path: '/checkout', component: CheckoutForm },
    { path: '/admin', component: AdminDoashBoardManager, layout: HeaderOnly },
];

export { publicRoutes };
