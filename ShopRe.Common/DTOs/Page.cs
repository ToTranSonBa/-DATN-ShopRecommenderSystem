namespace ShopRe.Common.DTOs
{
    public class Page
    {
        public Page(int total, int Size = 10, int curpage = 0)
        {
            currentPage = curpage;
            totalItem = total;
            pageSize = Size;
            totalPages = (int)Math.Ceiling(totalItem / (double)pageSize);
            LatestPage = totalPages - 1;
        }
        public int totalItem { get; set; }
        public int currentPage { get; set; } = 0;
        public int pageSize { get; set; }
        public int totalPages { get; set; }
        public int LatestPage { get; set; }
    }
}
