import renderLine from "./renderLine";

const CommentRating = ({ commentRating, totalComment }) => {
  return (
    <div class="space-y-3 mt-4 w-full sm:w-3/4 ">
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
        <div class="flex rounded w-full h-2 ml-3">
          {renderLine(commentRating?.rating4To5, totalComment, 1)}
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
        <div class="flex rounded w-full h-2 ml-3">
          {renderLine(commentRating?.rating3To4, totalComment, 2)}
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
        <div class="flex rounded w-full h-2 ml-3">
          {renderLine(commentRating?.rating2To3, totalComment, 3)}
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
        <div class="flex rounded w-full h-2 ml-3">
          {renderLine(commentRating?.rating1To2, totalComment, 4)}
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
        <div class="flex rounded w-full h-2 ml-3">
          {renderLine(commentRating?.ratingLessThanOrEqual1, totalComment, 5)}
        </div>
        <p class="text-sm text-gray-700 font-semibold ml-3">
          {commentRating?.ratingLessThanOrEqual1}
        </p>
      </div>
    </div>
  );
};

export default CommentRating;
