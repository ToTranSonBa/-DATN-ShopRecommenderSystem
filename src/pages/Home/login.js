import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import Home_login from '../../assets/HomeImg/homeLogin.jpg';
const LoginElement = () => {
    return (
        <div className="relative w-full">
            <img
                className="hidden w-full h-full border-transparent bl md:block md:max-lg:object-cover md:max-lg:min-h-3/4 md:max-lg:h-imgBG"
                src={Home_login}
                alt="This is home background"
            />
            <MaxWidthWrapper
                className={
                    'lg:-translate-x-1/2 absolute w-1/2 h-1/2 top-1/3 z-2 lg:left-1/2 md:left-8 flex-row justify-center'
                }
            >
                <div className="text-5xl  font-medium text-white text-center">Ready to get started?</div>
                <div className="text-center text-white lg:text-2xl lg:my-8">
                    Explore millions of products from trusted suppliers by signing up today!
                </div>
                <div className="text-center">
                    <button className="text-xl  text-white rounded-full lg:py-4 lg:px-12 bg-primary">Sign up</button>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};
export default LoginElement;
