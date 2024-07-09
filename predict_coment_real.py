import pandas as pd
import tensorflow as tf
from transformers import PhobertTokenizer
import pyodbc
from model import create_model, get_path

def predict_newmodel(input_text, encoded_to_label, tokenizer, new_model):
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
    connect_string = "DRIVER={SQL Server};SERVER=tcp:shoprecommend.database.windows.net,1433;DATABASE=ShopRecommend;UID=ShopRecommend;PWD=Quoc2002#;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"

    # Kết nối đến SQL Server
    connect = pyodbc.connect(connect_string)
    cursor = connect.cursor()

    # Lấy dữ liệu từ cơ sở dữ liệu
    cursor.execute('''
    SELECT [ID]
        ,[ID_SK]
        ,[AccountID]
        ,[SellerID]
        ,[ProductID]
        ,[Content]
        ,[CreditRating]
        ,[IsCredited]
    FROM [dbo].[DetailComments]
    WHERE [IsCredited] is NULL
    ''')
    result = cursor.fetchall()

    # Chuyển kết quả thành DataFrame
    result = [(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])  for row in result]
    # khởi tạo data frame trống
    df = pd.DataFrame(result, columns=['ID', 'ID_SK', 'AccountID', 'SellerID', 'ProductID', 'Content', 'CreditRating', 'IsCredited'])
    print('data shape in serrve: ',df.shape)

    # Đọc file encode
    file_path = get_path('data_processed.csv')
    df_encode = pd.read_csv(file_path, dtype={'content': str, 'label': str})
    df_encode['encoded_label'], _ = pd.factorize(df_encode['label'])

    new_model = create_model(num_labels=df_encode['encoded_label'].nunique(), learning_rate=5e-5)
    # Khôi phục trọng số từ tệp checkpoint đã lưu
    new_model.load_weights('./models/model_1.keras')
    print('Load model successfully ============>')
    label_to_encoded = dict(zip(df_encode['label'], df_encode['encoded_label']))
    encoded_to_label = {v: k for k, v in label_to_encoded.items()}

    # Dự đoán và cập nhật cơ sở dữ liệu
    print('Start Predict =========>')

    for index, row in df.iterrows():
        encoded_label, label = predict_newmodel(row['Content'], encoded_to_label, tokenizer, new_model)
        
        # Cập nhật cơ sở dữ liệu chỉ khi IsCredited là NULL
        if row['IsCredited'] is None:
            cursor.execute('''
            UPDATE [dbo].[DetailComments]
            SET CreditRating = ?, IsCredited = ?
            WHERE ID = ? AND IsCredited IS NULL
            ''', (label, True, row['ID']))
            connect.commit()

            # In ra dòng đang cập nhật
            print(f"Updating row {index + 1}/{df.shape[0]} with ID {row['ID']}")

    print('Update complete')

if __name__ == "__main__":
    main()
