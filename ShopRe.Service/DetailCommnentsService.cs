using ShopRe.Data.Infrastructure;
using ShopRe.Data.Repositories;
using ShopRe.Model.Models;
using System.Linq.Expressions;

namespace ShopRe.Service
{
    public interface IDetailCommentService
    {
        Task<IEnumerable<DetailComment>> GetAll();
        Task<IQueryable<DetailComment>> GetAll(bool trackChanges);
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

        public DetailCommentService(IDetailCommentRepository detailCommentRepository)
        {
            _detailCommentRepository = detailCommentRepository;
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
    }
}
