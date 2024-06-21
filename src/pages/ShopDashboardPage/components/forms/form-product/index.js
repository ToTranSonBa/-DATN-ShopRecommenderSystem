import React, { useState } from 'react';
import FormProduct from './form-product';
import FormProductOption from './form-product-option';

const FormProductManager = ({ action = 0, product = {}, open }) => {
    const [useroption, setUserOption] = useState('formproduct');

    return (
        <>
            {useroption === 'formproduct' && (
                <FormProduct action={action} product={product} open={open} useroption={setUserOption} />
            )}
            {useroption === 'formproductoption' && (
                <FormProductOption action={action} product={product} open={open} useroption={setUserOption} />
            )}
        </>
    );
};

export default FormProductManager;
