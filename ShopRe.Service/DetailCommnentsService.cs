using ShopRe.Data.Infrastructure;
using ShopRe.Common.DTOs;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;
using ShopRe.Data;
using Microsoft.EntityFrameworkCore;

namespace ShopRe.Service
{
    public interface IDetailCommentService
    {
        Task<IEnumerable<DetailComment>> GetAll();
        Task<IQueryable<DetailComment>> GetAll(bool trackChanges);
        Task<(IEnumerable<CommentDTO> comments, int total, MetaData metaData)> GetAllOnePro(int productId,CommentParameters commentParameters, bool trackChanges);
        Task<DetailComment> GetById(int id);
        Task<DetailComment> Add(DetailComment entity);
        Task<int> AddRange(IEnumerable<DetailComment> entities);
        Task<DetailComment> Update(DetailComment entity);
        void Remove(int id);
        IEnumerable<DetailComment> Find(Expression<Func<DetailComment, bool>> expression);
    }
    public class DetailCommentService : IDetailCommentService
    {
        private readonly IDetailCommentRepository _detailCommentRepository;
        private readonly ShopRecommenderSystemDbContext _dbContext;

        public DetailCommentService(IDetailCommentRepository detailCommentRepository, ShopRecommenderSystemDbContext dbContext)
        {
            _detailCommentRepository = detailCommentRepository;
            _dbContext = dbContext;
        }

        public Task<DetailComment> Add(DetailComment entity)
        {
            return _detailCommentRepository.Add(entity);
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
            var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.ID_NK == productId);

            if (product == null)
            {
                throw new InvalidOperationException("Sản phẩm không tồn tại!");
            }

            var total = await _dbContext.DetailComments.Where(c => c.ProductID == productId).CountAsync();
            var commentWithMetadata = await _detailCommentRepository.GetAllComment(productId, commentParameters, trackChanges);
            var commentDTO = commentWithMetadata.Select(e => new CommentDTO
            {
                ID = e.ID,
                AccountID = e.AccountID,
                SellerID = e.SellerID,
                ProductID = e.ProductID,
                Image = e.Image,
                Rating = e.Rating,
                Content = e.Content,
                CreatedAt = e.CreatedAt,
                //userName = e.Order.Account.Username
            });
            return (products: commentDTO, total, metaData: commentWithMetadata.MetaData);
        }

    }
}
