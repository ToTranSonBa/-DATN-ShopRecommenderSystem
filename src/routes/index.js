//Layouts
import { HeaderOnly } from '../layouts/index';
//page
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/Signup';
import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShopDashboardPage from '../pages/ShopDashboardPage/ShopDashboardPage';
import CartShoppingPage from '../pages/CartsShoppingPage/CartShoppingPage';
import UserPage from '../pages/UserPage/UserPage';
import ShopPage from '../pages/ShopPage';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage, layout: HeaderOnly },
    { path: '/signup', component: SignUpPage, layout: HeaderOnly },
    { path: '/productpage', component: ProductsPage },
    { path: '/productdetail', component: ProductDetailPage },
    { path: '/shopdashboardpage', component: ShopDashboardPage, layout: HeaderOnly },
    { path: '/cartshoppingpage', component: CartShoppingPage },
    { path: '/userpage', component: UserPage },
    { path: '/shoppage', component: ShopPage },
];

export { publicRoutes };
