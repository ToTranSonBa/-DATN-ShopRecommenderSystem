//Layouts
import { HeaderOnly } from '../components/layout/index';
//page
import ShopPage from '../pages/ShopPage/ShopPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import BagShopPage from '../pages/BagShopPage/BagShopPage';
import ShopDashboardPage from '../pages/ShopDashboardPage/ShopDashboardPage';
import CartShoppingPage from '../pages/CartsShoppingPage/CartShoppingPage';
import UserPage from '../pages/UserPage/UserPage'

const publicRoutes = [
    { path: '/shoppage', component: ShopPage },
    { path: '/productpage', component: ProductPage },
    { path: '/bagshoppage', component: BagShopPage },
    { path: '/shopdashboardpage', component: ShopDashboardPage, layout: HeaderOnly },
    { path: '/cartshoppingpage', component: CartShoppingPage },
    { path: '/userpage', component: UserPage },

];

export { publicRoutes };