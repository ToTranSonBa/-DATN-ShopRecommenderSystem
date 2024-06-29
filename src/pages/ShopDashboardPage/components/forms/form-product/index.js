import React, { useState } from 'react';
import FormProduct from './form-product';
import FormProductOption from './form-product-option';

const FormProductManager = ({ action = 0, product = {}, open }) => {
    const [useroption, setUserOption] = useState('formproduct');
    const [files, setFiles] = useState({});
    const [formValues, setFormValues] = useState({
        productName: '',
        productPrice: '',
        shortDescription: '',
        description: '',
        category: '',
        brand: '',
        productQuantitySold: 0,
    });
    const [options, setOptions] = useState([{ name: '', values: [''] }]);
    const [optionValues, setOptionValues] = useState([]);

    return (
        <>
            {useroption === 'formproduct' && (
                <FormProduct
                    action={action}
                    product={product}
                    open={open}
                    useroption={setUserOption}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    files={files}
                    setFiles={setFiles}
                    options={options}
                    optionValues={optionValues}
                />
            )}
            {useroption === 'formproductoption' && (
                <FormProductOption
                    action={action}
                    product={product}
                    open={open}
                    useroption={setUserOption}
                    formValues={formValues}
                    files={files}
                    options={options}
                    setOptions={setOptions}
                    optionValues={optionValues}
                    setOptionValues={setOptionValues}
                />
            )}
        </>
    );
};

export default FormProductManager;
