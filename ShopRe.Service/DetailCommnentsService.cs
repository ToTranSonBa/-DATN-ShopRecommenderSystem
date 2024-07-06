using ShopRe.Data.Infrastructure;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace ShopRe.Service
{
    public interface IDetailCommentService
    {
        Task<IEnumerable<DetailComment>> GetAll();
        Task<IQueryable<DetailComment>> GetAll(bool trackChanges);
        Task<(IEnumerable<CommentDTO> comments, int total, MetaData metaData)> GetAllOnePro(int productId,CommentParameters commentParameters, bool trackChanges);
        Task<DetailComment> GetById(int id);
        Task<bool> Add(CreateDetailCommentPrarameters entity, ApplicationUser user);
        Task<int> AddRange(IEnumerable<DetailComment> entities);
        Task<DetailComment> Update(DetailComment entity);
        void Remove(int id);
        IEnumerable<DetailComment> Find(Expression<Func<DetailComment, bool>> expression);
    }
    public class DetailCommentService : IDetailCommentService
    {
        private readonly IDetailCommentRepository _detailCommentRepository;
        private readonly ShopRecommenderSystemDbContext _dbContext;
        private readonly IMapper _mapper;

        public DetailCommentService(IDetailCommentRepository detailCommentRepository, ShopRecommenderSystemDbContext dbContext,
            IMapper mapper)
        {
            _detailCommentRepository = detailCommentRepository;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<bool> Add(CreateDetailCommentPrarameters entity, ApplicationUser user)
        {
            // Ensure the product exists
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == entity.ProductId && p.IsDeleted == false && p.SellerID_NK == entity.SellerId);
            if (product == null)
            {
                throw new ArgumentException("Sản phẩm không tồn tại!");
            }

            var order = await _dbContext.Order.FirstOrDefaultAsync(o => o.ID == entity.OrderId && o.ApplicationUser.Id == user.Id);
            if (order == null)
            {
                throw new ArgumentException("Đơn hàng không tồn tại!");
            }

            var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.UserID == user.TrainCode);

            try
            {
                var detailComment = new DetailComment
                {
                    Content = entity.Content ?? "",
                    ProductID = entity.ProductId,
                    Rating = entity.Rating,
                    SellerID = entity.SellerId,
                    AccountID = account.ID_NK,
                    OrderID = entity.OrderId,
                };

                await _dbContext.DetailComments.AddAsync(detailComment);
                await _dbContext.SaveChangesAsync();

                if (entity.Images.Count > 0)
                {
                    foreach (var item in entity.Images)
                    {
                        var imageComment = new CommentImages
                        {
                            DetailCommentID = detailComment.ID,
                            ImageUrl = item
                        };
                        await _dbContext.CommentImages.AddAsync(imageComment);
                    }
                }

                await _dbContext.SaveChangesAsync();
                order.IsRated = true;
                _dbContext.Order.Update(order);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding a detail comment.", ex);
            }
        }


        public Task<int> AddRange(IEnumerable<DetailComment> entities)
        {
            return _detailCommentRepository.AddRange(entities);
        }

        public IEnumerable<DetailComment> Find(Expression<Func<DetailComment, bool>> expression)
        {
            return _detailCommentRepository.Find(expression);
        }

        public Task<IEnumerable<DetailComment>> GetAll()
        {
            return _detailCommentRepository.GetAll();
        }

        public Task<IQueryable<DetailComment>> GetAll(bool trackChanges)
        {
            return _detailCommentRepository.GetAll(trackChanges);
        }

        public Task<DetailComment> GetById(int id)
        {
            return _detailCommentRepository.GetById(id);
        }

        public void Remove(int id)
        {
            _detailCommentRepository.Remove(id);
        }

        public Task<DetailComment> Update(DetailComment entity)
        {
            return _detailCommentRepository.Update(entity);
        }
        public async Task<(IEnumerable<CommentDTO> comments, int total, MetaData metaData)> GetAllOnePro(int productId, CommentParameters commentParameters, bool trackChanges)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == productId && p.IsDeleted == false);

            if (product == null)
            {
                throw new InvalidOperationException("Sản phẩm không tồn tại!");
            }

            var total = await _dbContext.DetailComments.Where(c => c.ProductID == productId).CountAsync();
            var commentWithMetadata = await _detailCommentRepository.GetAllComment(productId, commentParameters, trackChanges);

            //var commentDTOs = await Task.WhenAll(commentWithMetadata.Select(async e => new CommentDTO
            //{
            //    ID = e.ID,
            //    AccountID = e.AccountID,
            //    SellerID = e.SellerID,
            //    ProductID = e.ProductID,
            //    Image = e.Image,
            //    Rating = e.Rating,
            //    Content = e.Content,
            //    CreatedAt = e.CreatedAt,
            //    Account = _mapper.Map<AccountDTO>( await _dbContext.Accounts.FirstOrDefaultAsync(a => a.ID_NK == e.AccountID))
            //}));
            var listCmt = new List<CommentDTO>();
            foreach ( var c in commentWithMetadata) 
            {
                listCmt.Add(new CommentDTO
                {
                    ID = c.ID,
                    AccountID = c.AccountID,
                    SellerID = c.SellerID,
                    ProductID = c.ProductID,
                    Image = c.Images.Select(i => i.ImageUrl).ToList(),
                    Rating = c.Rating,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    Account = _mapper.Map<AccountDTO>(_dbContext.Accounts.FirstOrDefault(a => a.ID_NK == c.AccountID))
                });
            }
            return (comments: listCmt, total, metaData: commentWithMetadata.MetaData);
        }



    }
}
