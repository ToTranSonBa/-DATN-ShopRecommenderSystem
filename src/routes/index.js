//Layouts

//page
import ShopPage from '../pages/ShopPage/ShopPage';
import ProductPage from '../pages/ProductPage/ProductPage';

import BagShopPage from '../pages/BagShopPage/BagShopPage';

const publicRoutes = [
    { path: '/shoppage', component: ShopPage },
    { path: '/productpage', component: ProductPage },
    { path: '/bagshoppage', component: BagShopPage },
];

export { publicRoutes };