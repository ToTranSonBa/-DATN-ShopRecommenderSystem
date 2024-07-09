import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminUser() {
    return (
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Admin
                </h2>
                <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                        <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Leader
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Remote
                    </div>
                    {/* <div className="flex items-center mt-2 text-sm text-gray-500">
                        <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        $120k &ndash; $140k
                    </div> */}
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Now Time
                    </div>
                </div>
            </div>
        </div>
    );
}
