//Layouts
import { HeaderOnly } from '../layouts/index';
//page
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import Home from '../pages/Home';
import ShopPage from '../pages/ShopPage/ShopPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import ShopDashboardPage from '../pages/ShopDashboardPage/ShopDashboardPage';
import CartShoppingPage from '../pages/CartsShoppingPage/CartShoppingPage';
import UserPage from '../pages/UserPage/UserPage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage, layout: HeaderOnly },
    { path: '/signup', component: SignUpPage, layout: HeaderOnly },
    { path: '/shoppage', component: ShopPage },
    { path: '/productpage', component: ProductPage },
    { path: '/shopdashboardpage', component: ShopDashboardPage, layout: HeaderOnly },
    { path: '/cartshoppingpage', component: CartShoppingPage },
    { path: '/userpage', component: UserPage },
];

export { publicRoutes };
