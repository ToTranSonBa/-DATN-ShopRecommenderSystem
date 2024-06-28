import renderStars from "./RenderStars";
import Default_Avatar from "../../assets/default-avatar.png";

const CommentDetail = ({ comments }) => {
  return (
    <div>
      <div className="flex flex-col items-start mt-8">
        {comments?.map((item) => (
          <div className="flex flex-row pt-4">
            <img
              src={item.account?.avatar || Default_Avatar}
              alt="a"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div className="ml-3">
              <h4 className="text font-semibold text-gray-700">
                {item.account?.fullName}
              </h4>
              <div className="flex items-center space-x-1 mt-2">
                {renderStars(item?.rating)}
              </div>
              {item?.content !== "nan" ? (
                <p className="text-sm mt-2 mb-4 text-gray-700">{item?.content}</p>
              ) : (
                <p className="text-sm mt-2 mb-4 text-gray-700 italic">Không có đánh giá</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full mb-6 mt-8 px-4 py-2.5 bg-transparent border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700  font-semibold rounded"
      >
        Read all reviews
      </button>
    </div>
  );
};

export default CommentDetail;
