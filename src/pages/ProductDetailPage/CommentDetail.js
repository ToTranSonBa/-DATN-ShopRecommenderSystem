import renderStars from "./RenderStars";
import Default_Avatar from "../../assets/default-avatar.png";
import { useCallback, useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import axios from "axios";

const CommentDetail = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://localhost:7016/api/DetailComments/List${id}`,
        {
          params: {
            PageNumber: currentPage,
            PageSize: productsPerPage,
          },
        }
      );
      console.log("all comments: ", response);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments component:", error);
    }
  }, [currentPage, id, productsPerPage]);

  useEffect(() => {
    fetchComments();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function handlePagination(value) {
    try {
      setCurrentPage(value - 1);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSizePagination(current, pageSize) {
    try {
      setProductsPerPage(pageSize);
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex flex-col items-start mt-8">
        {comments.comment?.map((item) => (
          <div className="flex flex-row pt-4 mb-4">
            <img
              src={item.account?.avatar || Default_Avatar}
              alt="a"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div className="ml-3">
              <h4 className="text font-semibold text-gray-700">
                {item.account?.fullName || "Default Name"}
              </h4>
              <div className="flex items-center space-x-1 mt-2">
                {renderStars(item?.rating)}
              </div>
              {item?.content !== "nan" ? (
                <div
                  className="text-sm mt-2 mb-4 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                ></div>
              ) : (
                <p className="text-sm mt-2 mb-4 text-gray-700 italic">
                  Không có đánh giá
                </p>
              )}
              <div className="grid grid-cols-10 gap-4">
                {item.image &&
                  item.image.map((imageUrl) => (
                    <img
                      alt={item.account.iD_NK}
                      src={imageUrl}
                      className="h-40 w-40"
                    ></img>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center m-8">
        <Pagination
          defaultPageSize={5}
          defaultCurrent={0}
          total={comments.total}
          onChange={handlePagination}
          onShowSizeChange={handleSizePagination}
          showSizeChanger={false}
        />
      </div>

      {/* <button
        type="button"
        className="w-full mb-6 mt-8 px-4 py-2.5 bg-transparent border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700  font-semibold rounded"
        onClick={showModal}
      >
        Tất cả bình luận
      </button> */}
      <Modal
        title={`Tất cả bình luận  `}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
        className="overflow-scroll rounded-sm h-5/6"
      >
        <div className="flex flex-col items-start mt-8">
          {comments.comment?.map((item) => (
            <div className="flex flex-row pt-4 mb-4">
              <img
                src={item.account?.avatar || Default_Avatar}
                alt="a"
                className="w-12 h-12 border-2 border-white rounded-full"
              />
              <div className="ml-3">
                <h4 className="font-semibold text-gray-700 text">
                  {item.account?.fullName || "Default Name"}
                </h4>
                <div className="flex items-center mt-2 space-x-1">
                  {renderStars(item?.rating)}
                </div>
                {item?.content !== "nan" ? (
                  <p className="mt-2 mb-4 text-sm text-gray-700">
                    {item?.content}
                  </p>
                ) : (
                  <p className="mt-2 mb-4 text-sm italic text-gray-700">
                    Không có đánh giá
                  </p>
                )}
                <div className="grid grid-cols-10 gap-4">
                  {item?.image &&
                    item?.image?.map((imageUrl) => (
                      <img
                        alt={item?.account.iD_NK}
                        src={imageUrl}
                        className="w-40 h-40"
                      ></img>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default CommentDetail;
