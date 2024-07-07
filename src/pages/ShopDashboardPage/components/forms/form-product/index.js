import React, { useState } from 'react';
import FormProduct from './form-product';
import FormProductOption from './form-product-option';
import FormProductChildren from './form-product-children'

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
        images: []
    });
    const [options, setOptions] = useState([{ name: '', values: [{}] }]);
    const [optionValues, setOptionValues] = useState([[]]);
    const [combinations, setCombinations] = useState(null);

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

            {useroption === 'formproductchildren' && (
                <FormProductChildren
                    action={action}
                    product={product}
                    open={open}
                    useroption={setUserOption}
                    formValues={formValues}
                    files={files}
                    options={options}
                    optionValues={optionValues}
                    combinations={combinations}
                    setCombinations={setCombinations}
                />
            )}
        </>
    );
};

export default FormProductManager;
