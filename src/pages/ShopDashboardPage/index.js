import React, { useState, useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import DoashboardHeader from './components/header';
import DoashboardSideBar from './components/sidebar';
import ECommerceDoashboard from './ecommerce';
import Calendar from './components/calendar';
import Profile from './profile';
import FormElement from './components/forms/form-elements';
import FormLayout from './components/forms/form-layout';
import FormProductManager from './components/forms/form-product';
import TableProduct from './components/tables/table-product';
import TableOrder from './components/tables/table-01';
import SellerSettings from './settings';
function SellerDashboard() {
    const [useroption, setUserOption] = useState('ecommercedoashboard');
    const [dropdownDashboardOpen, setDropdownDashboardOpen] = useState(false);

    return (
        <div className="w-full h-auto bg-white">
            <div className="flex">
                <side className="max-w-screen-md ">
                    <DoashboardSideBar useroption={setUserOption} setDropdownDashboardOpen={setDropdownDashboardOpen} />
                </side>
                <div className="w-full h-auto">
                    <header className="z-10 w-full">
                        <DoashboardHeader
                            useroption={setUserOption}
                            setDropdownDashboardOpen={setDropdownDashboardOpen}
                        />
                    </header>
                    <main className="w-full h-auto">
                        {useroption === 'ecommercedoashboard' && <ECommerceDoashboard />}
                        {useroption === 'calendar' && <Calendar />}
                        {useroption === 'profile' && <Profile />}
                        {useroption === 'formslayout' && <FormLayout />}
                        {useroption === 'formselements' && <FormElement />}
                        {useroption === 'tableproduct' && <TableProduct />}
                        {useroption === 'tableorder' && <TableOrder />}
                        {useroption === 'settings' && <SellerSettings />}
                        {useroption === 'formaddproduct' && <FormProductManager />}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;
