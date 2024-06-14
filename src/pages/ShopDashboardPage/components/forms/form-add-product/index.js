import React, { useState } from 'react';
import FormProduct from './form-product';
import FormProductOption from './form-product-option';

const FormAddProduct = () => {
    const [useroption, setUserOption] = useState('formproduct');
    return (
        <>
            {useroption === 'formproduct' && <FormProduct useroption={setUserOption} />}
            {useroption === 'formproductoption' && <FormProductOption useroption={setUserOption} />}
        </>
    );
};

export default FormAddProduct;
