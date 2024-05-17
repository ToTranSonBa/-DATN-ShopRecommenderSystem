using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ShopRe.Model
{
    public class Response<T> where T : class
    {
        public string message { get; set; }
        public string status { get; set; }
        public string token { get; set; }
        public IEnumerable<T> Data { get; set; }
        public string jsonResponse(Response<T> response)
        {
            return JsonSerializer.Serialize(response);
        }
        public Response(string message, string status, IEnumerable<T> data, string token)
        {
            this.message = message;
            this.status = status;
            Data = data;
            this.token = token;
        }
        public Response() {
            this.message = "";
            this.status = "";
            Data = null;
            token = "";
        }
    }
}
