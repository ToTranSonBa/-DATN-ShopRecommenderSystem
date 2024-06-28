import React from 'react';
import Footer from '../../components/Footer/Footer';
import RecommendTop from './recomendTop';
import Search from './search';
import Summary from './sumary';

import TimeLine from './timeline';
import Categories from './categories';
import LoginElement from './login';
import Our from './our';
import Trade from './trade';

import AddressForm from '../../components/Address';
import Shops from './shops';
import ExpandProduct from './expand';
const Home = () => {
    return (
        <div className="w-full bg-black">
            <Search />
            <Summary />
            <Shops />
            <Categories />
            <RecommendTop />
            <Trade />
            <TimeLine />
            <LoginElement />
            <Our />
            <ExpandProduct />
        </div>
    );
};
export default Home;
