CONN_STR = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=tcp:shoprecommend.database.windows.net,1433;DATABASE=ShopRecommend;UID=ShopRecommend;PWD=Quoc2002#;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
# CONN_STR = 'DRIVER=ODBC Driver 17 for SQL Server; Server=localhost; Database=ShopRecommend; Trusted_Connection=yes;'

ES_CLOUD_ID = "ShopRecommendES:YXNpYS1lYXN0MS5nY3AuZWxhc3RpYy1jbG91ZC5jb206NDQzJDUwY2ZiZDI1ZWU4MjRmNWFhNzJlY2NmMDk0MDU4YmM5JDgwY2EwOTI3YzZhMDRmNWI4M2FhZTUxN2Q1M2I1NTc0"
ES_USER = "elastic"
ES_PWD = "ANdFJFHrXJgmSsEj2Lxe70AE"

FASTAPI_HOST = 'localhost'
FASTAPI_PORT = 80
CONTENT_BASED_CLUSTER = [1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127]

# NBCF
training_cancel = 0
training_phase = 0
training_status = 0
training_error = 0
training_end = 0
training_start = 0

# CBF
cbf_cancel = 0
cbf_phase = 0
cbf_status = 0
cbf_error = 0
cbf_end = 0
cbf_start = 0


CMT_cancel = 0
CMT_phase = 0
CMT_status = 0
CMT_error = 0
CMT_end = 0
CMT_start = 0


if __name__ ==  '__main__':
    print(1)