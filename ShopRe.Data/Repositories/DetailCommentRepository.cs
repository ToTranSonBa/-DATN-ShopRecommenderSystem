using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopRe.Common.RequestFeatures;
using ShopRe.Data.Infrastructure;
using ShopRe.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Data.Repositories
{
    public interface IDetailCommentRepository : IRepository<DetailComment>
    {
        Task<PagedList<DetailComment>?> GetAllComment(int productId, CommentParameters commentParameters, bool trackChanges);
    }
    public class DetailCommentRepository : RepositoryBase<DetailComment> , IDetailCommentRepository
    {
        public DetailCommentRepository(ShopRecommenderSystemDbContext _context, IMapper _mapper) : base(_context, _mapper)
        {

        }
        public async Task<PagedList<DetailComment>?> GetAllComment(int productId, CommentParameters commentParameters, bool trackChanges)
        {
            var obj = FindByCondition(p => p.ProductID == productId, trackChanges)
                .Include(p => p.Order);
            return PagedList<DetailComment>
                .ToPagedList(obj, commentParameters.PageNumber,
                commentParameters.PageSize);
        }
    }
}
