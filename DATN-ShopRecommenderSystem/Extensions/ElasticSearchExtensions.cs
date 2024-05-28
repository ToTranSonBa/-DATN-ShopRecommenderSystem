using Nest;
using ShopRe.Model.Models;

namespace DATN_ShopRecommenderSystem.Extensions
{
    public static class ElasticSearchExtensions
    {

        public static void AddElasticSearch(this IServiceCollection services, IConfiguration configuration)
        {
            var url = configuration["ELKConfiguration:Uri"];
            var defaultIndex = configuration["ELKConfiguration:index"];
            var defaultIndex2 = configuration["ELKConfiguration:index2"];
            var defaultIndex3 = configuration["ELKConfiguration:index3"];

            var setting = new ConnectionSettings(new Uri(url)).PrettyJson().DefaultIndex(defaultIndex).BasicAuthentication(configuration["ELKConfiguration:username"], configuration["ELKConfiguration:password"]);

            AddDefaultMappings(setting);

            var client = new ElasticClient(setting);
            services.AddSingleton<IElasticClient>(client);

            CreateIndex(client, defaultIndex, defaultIndex2, defaultIndex3);
        }
        private static void AddDefaultMappings(ConnectionSettings connectionSettings)
        {
            connectionSettings.DefaultMappingFor<Product>(p => p
                .Ignore(x => x.CreatedAt)
                .Ignore(x => x.UpdatedAt)
                .Ignore(x => x.DeletedAt)
            );

        }
        private static void CreateIndex(IElasticClient client, string indexName, string indexName2, string indexName3)
        {
            client.Indices.Create(indexName, i => i.Map<Product>(x => x.AutoMap()));
            client.Indices.Create(indexName3, i => i.Map<Brand>(x => x.AutoMap()));

            var indexExistsResponse = client.Indices.Exists(indexName2);
            if (indexExistsResponse.Exists)
            {
                var updateIndexResponse = client.Indices.PutMapping<SellerPriority>(m => m
                    .Index("accselpri")
                    .Properties(props => props
                        .Number(n => n
                            .Name(p => p.AccID)
                            .Type(NumberType.Integer)
                           .Fields(f => f
                                .Keyword(k => k.Name("ACCOUNTID"))
                            )
                        )
                        .Number(n => n
                            .Name(p => p.SellerID)
                            .Type(NumberType.Integer)
                           .Fields(f => f
                                .Keyword(k => k.Name("SELLERID"))
                            )
                        )
                        .Number(n => n
                            .Name(p => p.Idx)
                            .Type(NumberType.Integer)
                            .Fields(f => f
                                .Keyword(k => k.Name("IDX"))
                            )
                        )
                    )
                );
            }
            else
            {
                var createIndexResponse = client.Indices.Create(indexName2, c => c
                .Map<SellerPriority>(m => m
                    .Properties(props => props
                        .Number(n => n
                            .Name(p => p.AccID)
                            .Type(NumberType.Integer)
                           .Fields(f => f
                                .Keyword(k => k.Name("ACCOUNTID"))
                            )
                        )
                        .Number(n => n
                            .Name(p => p.SellerID)
                            .Type(NumberType.Integer)
                           .Fields(f => f
                                .Keyword(k => k.Name("SELLERID"))
                            )
                        )
                        .Number(n => n
                            .Name(p => p.Idx)
                            .Type(NumberType.Integer)
                            .Fields(f => f
                                .Keyword(k => k.Name("IDX"))
                            )
                        )
                    )
                ));
            }
        }
    }

}
