from datetime import datetime, timedelta
import schedule
import pyodbc
import time

conn_str = 'DRIVER=ODBC Driver 17 for SQL Server; Server=.; Database=ShopRecommend; Trusted_Connection=yes;'

def daily_job():
    print("training")
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    cursor.execute("EXEC [dbo].[RecommendDaily]")
    conn.close()

schedule.every().day.at("00:00").do(daily_job)

if __name__ == '__main__':
    while True:
        schedule.run_pending()
        time.sleep(1)
        print(time.time)