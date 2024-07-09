import pandas as pd
import tensorflow as tf
from transformers import PhobertTokenizer
import pyodbc
from model import create_model, get_path
# import model

def predict_newmodel(input_text, encoded_to_label,tokenizer,new_model):
    # Mã hóa văn bản đầu vào
    encoded_input = tokenizer.encode_plus(
        input_text,
        return_tensors='tf',
        max_length=256,  # Độ dài tối đa của chuỗi đầu vào
        truncation=True,
        padding='max_length'
    )
    # Dự đoán
    predictions = new_model(encoded_input)
    
    # Trích xuất mảng logits từ đối tượng từ điển predictions
    logits = predictions['logits']
    # Chọn nhãn có xác suất cao nhất
    predicted_label_encoded = tf.argmax(logits, axis=1).numpy()[0]
    
    # Trích xuất label ban đầu từ label encoded
    predicted_label = encoded_to_label[predicted_label_encoded]
    
    return predicted_label_encoded, predicted_label


def main():
    # Khởi tạo tokenizer của PhoBERT
    tokenizer = PhobertTokenizer.from_pretrained('vinai/phobert-base', use_fast=False)

    # Thiết lập chuỗi kết nối
    connect_string = "Driver={SQL Server};Server=HoangCau;Database=ShopRecommend;Trusted_Connection=yes;"

    # Kết nối đến SQL Server
    connect = pyodbc.connect(connect_string)
    cursor = connect.cursor()

        # Kiểm tra kết quả kết nôi
    cursor.execute('''
    SELECT
        cmt.[AccountID], 
        cmt.[SellerID],
        cmt.[Content],
        cmt.[Rating],
        seller.[AvgRatingPoint],
        seller.[TotalFollower],
        seller.[IsOfficial],
        product.[RatingAverage],
        product.[AllTimeQuantitySold]
    FROM 
        [ShopRecommend].[dbo].[DetailComments] cmt 
        JOIN [ShopRecommend].[dbo].[Seller] seller ON cmt.SellerID = seller.ID_NK 
        JOIN [ShopRecommend].[dbo].[Product] product ON cmt.ProductID = product.ID_NK 
    ''')
    result = cursor.fetchall()
    result = [(row[0], row[1], row[2], round(row[3], 5), round(row[4], 5), row[5], row[6], round(row[7], 5), row[8])  for row in result]

    
    # khởi tạo data frame trống
    df = pd.DataFrame(result, columns=['AccountID', 'SellerID', 'Content', 'Rating', 'SellerAvgRatingPoint', 'SellerTotalFollower', 'SellerIsOfficial', 'ProductRatingAverage', 'ProductQuantitySold'])
    print('data shape in serrve: ',df.shape)


    # encode
    file_path = get_path('data_processed.csv')
    df_encode = pd.read_csv(file_path, dtype={'content': str, 'label': str})
    df_encode['encoded_label'], _ = pd.factorize(df_encode['label'])

    new_model = create_model(num_labels=df_encode['encoded_label'].nunique(), learning_rate=5e-5)
    # Khôi phục trọng số từ tệp checkpoint đã lưu
    new_model.load_weights('./models/model_1.keras')
    print('Load data successfully ============>')
    label_to_encoded = dict(zip(df_encode['label'], df_encode['encoded_label']))
    encoded_to_label = {v: k for k, v in label_to_encoded.items()}


        # Dự đoán cột Content và thêm cột mới vào DataFrame
    print('Start Predict =========>')

    encoded_labels = []
    labels = []

    for content in df['Content']:
        encoded_label, label = predict_newmodel(content, encoded_to_label, tokenizer, new_model)
        encoded_labels.append(encoded_label)
        labels.append(label)

    df['encoded_label'] = encoded_labels
    df['label'] = labels

    # Xuất DataFrame ra file CSV nếu cần
    df.to_csv('predicted_results.csv', index=False)
    print('adlo: ',df.head(10))
if __name__ == "__main__":
    main()