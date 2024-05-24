﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopRe.Model.Models
{
    public class OrderItems
    {
        public int Id { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public Product? Product { get; set; }
        public Order? Order { get; set; }
    }
}