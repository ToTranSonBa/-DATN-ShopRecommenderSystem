using Nest;
using ShopRe.Model.Models;
using System.Runtime.CompilerServices;

namespace DATN_ShopRecommenderSystem.Extensions
{
    public static class ElasticSearchExtensions
    {

        public static void AddElasticSearch(this IServiceCollection services, IConfiguration configuration)
        {
            var url = configuration["ELKConfiguration:Uri"];
            var defaultIndex = configuration["ELKConfiguration:index"];

            var setting = new ConnectionSettings(new Uri(url)).PrettyJson().DefaultIndex(defaultIndex);

            AddDefaultMappings(setting);

            var client = new ElasticClient(setting);
            services.AddSingleton<IElasticClient>(client);

            CreateIndex(client, defaultIndex);
        }
        private static void AddDefaultMappings(ConnectionSettings connectionSettings)
        {
            connectionSettings.DefaultMappingFor<Product>(p => p.Ignore(x => x.CreatedAt).Ignore(x => x.UpdatedAt).Ignore(x => x.DeletedAt));
        }
        private static void CreateIndex(IElasticClient client, string indexName)
        {
            client.Indices.Create(indexName, i => i.Map<Product>(x => x.AutoMap()));
        }
    }

}
