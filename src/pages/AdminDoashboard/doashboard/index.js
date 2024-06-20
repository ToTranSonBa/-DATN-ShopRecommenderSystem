import OneColumnBarChart from '../charts/one-column-bar-chart';

const AdminDoashboard = () => {
    return (
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-44">
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-600 dark:bg-gray-800"></div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"></div>
                </div>

                <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <OneColumnBarChart className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};
export default AdminDoashboard;
