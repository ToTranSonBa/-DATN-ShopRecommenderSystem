const CommentRating = ({ commentRating }) => {
  return (
    <div class=" space-y-3 mt-4 w-full sm:w-2/4 ">
      <div class="flex items-center">
        <p class="text-sm text-gray-700 font-semibold">5.0</p>
        <svg
          class="w-5 fill-yellow-300 ml-1"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
        <div class="bg-gray-300 rounded w-full h-2 ml-3">
          <div class="w-2/3 h-full rounded bg-yellow-300"></div>
        </div>
        <p class="text-sm text-gray-700 font-semibold ml-3">
          {commentRating?.rating4To5}
        </p>
      </div>

      <div class="flex items-center">
        <p class="text-sm text-gray-700 font-semibold">4.0</p>
        <svg
          class="w-5 fill-yellow-300 ml-1"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
        <div class="bg-gray-300 rounded w-full h-2 ml-3">
          <div class="w-1/3 h-full rounded bg-yellow-300"></div>
        </div>
        <p class="text-sm text-gray-700 font-semibold ml-3">
          {commentRating?.rating3To4}
        </p>
      </div>

      <div class="flex items-center">
        <p class="text-sm text-gray-700 font-semibold">3.0</p>
        <svg
          class="w-5 fill-yellow-300 ml-1"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
        <div class="bg-gray-300 rounded w-full h-2 ml-3">
          <div class="w-1/6 h-full rounded bg-yellow-300"></div>
        </div>
        <p class="text-sm text-gray-700 font-semibold ml-3">
          {commentRating?.rating2To3}
        </p>
      </div>

      <div class="flex items-center">
        <p class="text-sm text-gray-700 font-semibold">2.0</p>
        <svg
          class="w-5 fill-yellow-300 ml-1"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
        <div class="bg-gray-300 rounded w-full h-2 ml-3">
          <div class="w-1/12 h-full rounded bg-yellow-300"></div>
        </div>
        <p class="text-sm text-gray-700 font-semibold ml-3">
          {commentRating?.rating1To2}
        </p>
      </div>

      <div class="flex items-center">
        <p class="text-sm text-gray-700 font-semibold">1.0</p>
        <svg
          class="w-5 fill-yellow-300 ml-1"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
        <div class="bg-gray-300 rounded w-full h-2 ml-3">
          <div class="w-[6%] h-full rounded bg-yellow-300"></div>
        </div>
        <p class="text-sm text-gray-700 font-semibold ml-3">
          {commentRating?.ratingLessThanOrEqual1}
        </p>
      </div>
    </div>
  );
};

export default CommentRating;
