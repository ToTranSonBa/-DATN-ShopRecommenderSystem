# packages
import pyodbc
import pandas as pd
import numpy as np
import os
# module
import data_preprocessing

# def connect_to_database(server='localhost', database='ShopRecommend'):
#     """
#     Kết nối đến cơ sở dữ liệu SQL Server.

#     Parameters:
#         server (str): Tên máy chủ SQL Server.
#         database (str): Tên cơ sở dữ liệu.

#     Returns:
#         pyodbc.Connection: Đối tượng kết nối.
#     """
#     connect_string = f'DRIVER=ODBC Driver 17 for SQL Server; Server={server}; Database={database}; Trusted_Connection=yes;'
#     connect = pyodbc.connect(connect_string)
#     return connect

# def fetch_data(connect):
#     """
#     Truy vấn dữ liệu từ cơ sở dữ liệu và trả về kết quả.

#     Parameters:
#         connect (pyodbc.Connection): Đối tượng kết nối đến cơ sở dữ liệu.

#     Returns:
#         list: Danh sách các bản ghi từ truy vấn.
#     """
#     cursor = connect.cursor()
#     cursor.execute('''
#     SELECT 
#         cmt.[AccountID], 
#         cmt.[SellerID],
#         cmt.[Content],
#         cmt.[Rating],
#         seller.[AvgRatingPoint],
#         seller.[TotalFollower],
#         seller.[IsOfficial],
#         product.[RatingAverage],
#         product.[AllTimeQuantitySold]
#     FROM 
#         [ShopRecommend].[dbo].[DetailComments] cmt 
#         JOIN [ShopRecommend].[dbo].[Seller] seller ON cmt.SellerID = seller.ID_NK 
#         JOIN [ShopRecommend].[dbo].[Product] product ON cmt.ProductID = product.ID_NK 
#     ''')
#     return cursor.fetchall()

def preprocess_data(df, column):
    """
    Tiền xử lý kết quả từ cơ sở dữ liệu.

    Parameters:
        data (list): Kết quả từ truy vấn cơ sở dữ liệu.

    Returns:
        pandas.DataFrame: DataFrame chứa dữ liệu đã tiền xử lý.
    """
    # Chuyển đổi tất cả các giá trị trong cột 'Content' thành chuỗi
    df[column] = df[column].astype(str)
    df[column] = df[column].fillna('')
    df[column] = df[column].replace(to_replace=[np.nan, 'nan'], value='', regex=True)
    
    df[column] = df[column].apply(data_preprocessing.tien_xu_li)
    return df

def get_path(fileName):
    
    # Kiểm tra và tạo thư mục "data" nếu nó chưa tồn tại
    data_folder = 'data'
    if not os.path.exists(data_folder):
        os.makedirs(data_folder)

    # Đường dẫn đến tệp CSV
    file_path = os.path.join(data_folder, fileName)

    return file_path

def load_data(file_path):
    df = pd.read_csv(file_path, dtype={'content': str, 'label': str})
    df['content'] = df['content'].fillna('').astype(str)
    return df

def to_csv(dataframe):
    
    # Kiểm tra và tạo thư mục "data" nếu nó chưa tồn tại
    data_folder = 'data'
    if not os.path.exists(data_folder):
        os.makedirs(data_folder)

    # Đường dẫn đến tệp CSV
    csv_file_path = os.path.join(data_folder, 'data_processed.csv')

    # Xuất DataFrame thành tệp CSV và lưu vào thư mục "data"
    dataframe.to_csv(csv_file_path, index=False)

    print(f"Đã lưu tệp CSV vào: {csv_file_path}")


# Sử dụng các hàm đã định nghĩa
def main():
    file_path = get_path('data.csv')
    df = load_data(file_path)
    df = preprocess_data(df,'content')
    print(df.head(10))
    return to_csv(df);

if __name__ == "__main__":
    main()
