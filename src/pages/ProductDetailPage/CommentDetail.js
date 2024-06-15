import renderStars from "./RenderStars";

const CommentDetail = ({ comments }) => {
  return (
    <div>
      <div class="flex items-start mt-8">
        <img
          src={comments?.[0].account?.avatar}
          alt="a"
          class="w-12 h-12 rounded-full border-2 border-white"
        />

        <div class="ml-3">
          <h4 class="text-sm font-semibold text-gray-700">
            {comments?.[0].account?.fullName}
          </h4>
          <div className="flex items-center space-x-1 mt-4">
            {renderStars(comments?.[0].rating)}
          </div>
          <p class="text-xs mt-4 text-gray-700">
            {comments?.[0].content}
          </p>
        </div>
      </div>

      <button
        type="button"
        class="w-full mb-6 mt-8 px-4 py-2.5 bg-transparent border border-blue-700 text-blue-700 font-semibold rounded"
      >
        Read all reviews
      </button>
    </div>
  );
};

export default CommentDetail;
