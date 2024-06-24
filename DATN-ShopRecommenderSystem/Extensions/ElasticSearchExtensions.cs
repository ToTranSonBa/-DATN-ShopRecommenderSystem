using Elasticsearch.Net;
using Microsoft.Extensions.Configuration;
using Nest;
using ShopRe.Model.Models;
using System;

namespace DATN_ShopRecommenderSystem.Extensions
{
    public static class ElasticSearchExtensions
    {

        public static void AddElasticSearch(this IServiceCollection services, IConfiguration configuration)
        {
            var CloudId = configuration["ElasticsearchSettings:CloudId"];
            var ApiKey = configuration["ElasticsearchSettings:ApiKey"];
            var defaultIndex = configuration["ElasticsearchSettings:index"];
            var defaultIndex2 = configuration["ElasticsearchSettings:index2"];
            var defaultIndex3 = configuration["ElasticsearchSettings:index3"];
            var defaultIndex4 = configuration["ElasticsearchSettings:index4"];

            //var elasticsearchSettings = configuration.GetSection("ElasticsearchSettings").Get<ElasticsearchSettings>();

            var pool = new CloudConnectionPool(CloudId, new ApiKeyAuthenticationCredentials(ApiKey));
            var settings = new ConnectionSettings(pool)
                .DefaultIndex(defaultIndex)
                .DefaultIndex(defaultIndex2)
                .DefaultIndex(defaultIndex3)
                .DefaultIndex(defaultIndex4);

            AddDefaultMappings(settings);
            var client = new ElasticClient(settings);

            services.AddSingleton<IElasticClient>(client);

            CreateIndex(client, defaultIndex, defaultIndex2, defaultIndex3, defaultIndex4);
        }
        private static void AddDefaultMappings(ConnectionSettings connectionSettings)
        {
            connectionSettings.DefaultMappingFor<Product>(p => p
                .Ignore(x => x.CreatedAt)
                .Ignore(x => x.UpdatedAt)
                .Ignore(x => x.DeletedAt)
            );

        }
        private static void CreateIndex(IElasticClient client, string indexName, string indexName2, string indexName3, string indexName4)
        {
            client.Indices.Create(indexName, i => i.Map<Product>(x => x.AutoMap()));
            client.Indices.Create(indexName3, i => i.Map<Brand>(x => x.AutoMap()));
            client.Indices.Create(indexName4, i => i.Map<DetailComment>(x => x.AutoMap()));

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
