import os
import warnings
import pandas as pd
import tensorflow as tf
from transformers import PhobertTokenizer, TFRobertaForSequenceClassification
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score

# Suppress TensorFlow and Deprecation warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
warnings.filterwarnings("ignore", category=DeprecationWarning)
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)

def get_path(fileName):
    data_folder = 'data'
    if not os.path.exists(data_folder):
        os.makedirs(data_folder)
    file_path = os.path.join(data_folder, fileName)
    return file_path

def load_data(file_path):
    df = pd.read_csv(file_path, dtype={'content': str, 'label': str})
    df['content'] = df['content'].fillna('').astype(str)
    return df

def encode_labels(df):
    df['encoded_label'] = pd.factorize(df['label'])[0]
    label_to_encoded = df.groupby('label')['encoded_label'].first().to_dict()
    return df, label_to_encoded

def prepare_datasets(df, batch_size, shuffle, test_size=0.2, random_state=0):
    tokenizer = PhobertTokenizer.from_pretrained('vinai/phobert-base', use_fast=False)
    data_encodings = tokenizer(df['content'].to_list(), truncation=True, padding=True, return_tensors='tf')
    data_encodings = {key: value.numpy() for key, value in data_encodings.items()}
    data_labels = df['encoded_label'].to_list()
    
    train_texts, val_texts, train_labels, val_labels = train_test_split(
        data_encodings['input_ids'], data_labels, test_size=test_size, random_state=random_state)
    train_masks, val_masks = train_test_split(
        data_encodings['attention_mask'], test_size=test_size, random_state=random_state)
    
    train_dataset = tf.data.Dataset.from_tensor_slices(
        ({'input_ids': train_texts, 'attention_mask': train_masks}, train_labels))
    val_dataset = tf.data.Dataset.from_tensor_slices(
        ({'input_ids': val_texts, 'attention_mask': val_masks}, val_labels))
    
    if shuffle:
        train_dataset = train_dataset.shuffle(1000)
    
    train_dataset = train_dataset.batch(batch_size)
    val_dataset = val_dataset.batch(batch_size)
    
    return train_dataset, val_dataset, tokenizer

def create_model(num_labels, learning_rate):
    model = TFRobertaForSequenceClassification.from_pretrained('vinai/phobert-base', num_labels=num_labels)
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                  metrics=[tf.keras.metrics.SparseCategoricalAccuracy()])
    return model

# def train_model(model, train_dataset, val_dataset, epochs=20):
#     log_dir = './models/logs'
#     if not os.path.exists(log_dir):
#         os.makedirs(log_dir)
    
#     callbacks = [
#         tf.keras.callbacks.ModelCheckpoint(filepath='./models/best_model.keras', save_best_only=False),
#         tf.keras.callbacks.TensorBoard(log_dir=log_dir),
#         tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)
#     ]
#     model.fit(train_dataset, epochs=epochs, validation_data=val_dataset, callbacks=callbacks)

def train_model(model, train_dataset, val_dataset, epochs=1):
    log_dir = './models/logs'
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    
    callbacks = [
        tf.keras.callbacks.ModelCheckpoint(filepath='./models/model_{epoch}.keras', save_best_only=False),
        tf.keras.callbacks.TensorBoard(log_dir=log_dir),
        tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)
    ]
    
    model.fit(train_dataset, epochs=epochs, validation_data=val_dataset, callbacks=callbacks)

def evaluate_model(model, val_dataset):
    y_true = []
    y_pred = []
    for batch in val_dataset:
        inputs, labels = batch
        y_true.extend(labels.numpy())
        predictions = model.predict(inputs).logits
        y_pred.extend(tf.argmax(predictions, axis=-1).numpy())
    
    accuracy = tf.keras.metrics.SparseCategoricalAccuracy()
    accuracy.update_state(y_true, y_pred)
    
    precision = precision_score(y_true, y_pred, average='weighted')
    recall = recall_score(y_true, y_pred, average='weighted')
    f1 = f1_score(y_true, y_pred, average='weighted')
    
    return accuracy.result().numpy(), precision, recall, f1

def grid_search(df, label_to_encoded):
    learning_rates = [5e-5]
    batch_sizes = [32]
    shuffle_options = [True]
    
    best_accuracy = 0
    best_params = {}

    for lr in learning_rates:
        for batch_size in batch_sizes:
            for shuffle in shuffle_options:
                print(f"Testing with learning_rate={lr}, batch_size={batch_size}, shuffle={shuffle}")
                train_dataset, val_dataset, _ = prepare_datasets(df, batch_size, shuffle)
                model = create_model(num_labels=df['encoded_label'].nunique(), learning_rate=lr)
                train_model(model, train_dataset, val_dataset, epochs=20)
                accuracy, precision, recall, f1 = evaluate_model(model, val_dataset)
                print(f"Accuracy: {accuracy}, Precision: {precision}, Recall: {recall}, F1-Score: {f1}")

                if accuracy > best_accuracy:
                    best_accuracy = accuracy
                    best_params = {
                        'learning_rate': lr,
                        'batch_size': batch_size,
                        'shuffle': shuffle
                    }
    
    print(f"Best params: {best_params}")
    print(f"Best accuracy: {best_accuracy}")

def main():
    file_path = get_path('data_processed.csv')
    df = load_data(file_path)
    df = df.drop(index=df.index[df.index >= 100])
    if not isinstance(df, pd.DataFrame):
        raise ValueError("load_data phải trả về một DataFrame")
    
    df, label_to_encoded = encode_labels(df)
    grid_search(df, label_to_encoded)

if __name__ == "__main__":
    main()

