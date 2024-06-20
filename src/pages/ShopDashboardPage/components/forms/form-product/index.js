import React, { useState } from 'react';
import FormProduct from './form-product';
import FormProductOption from './form-product-option';

const FormProductManager = ({ action = 0, product }) => {
    const [useroption, setUserOption] = useState('formproduct');
    return (
        <>
            {useroption === 'formproduct' && <FormProduct useroption={setUserOption} />}
            {useroption === 'formproductoption' && <FormProductOption useroption={setUserOption} />}
        </>
    );
};

export default FormProductManager;
