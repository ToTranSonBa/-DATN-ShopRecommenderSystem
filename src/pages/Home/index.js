// Home.js
import React, { useState } from 'react';
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
    const [isRecommendTopFetched, setIsRecommendTopFetched] = useState(false);

    const handleFetchComplete = () => {
        setIsRecommendTopFetched(true);
    };

    return (
        <div className="w-full bg-black">
            <Search />
            <Summary />
            <Shops />
            <Categories />
            <RecommendTop onFetchComplete={handleFetchComplete} />
            <Trade />
            <TimeLine />
            <LoginElement />
            <Our />
            {isRecommendTopFetched && (
                <>

                    <ExpandProduct />
                </>
            )}
        </div>
    );
};

export default Home;
