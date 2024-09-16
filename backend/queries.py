import psycopg
import os

# conn details 
db_host = "airbnb-db.cjyekamgomzz.eu-west-2.rds.amazonaws.com"  # RDS Endpoint
db_port = "5432"  # Default PostgreSQL port
db_name = "postgres"
db_user = "jherng"
# db_password = os.environ.get('DB_PASSWORD')
db_password = "h(rSWH2BaC0vu#Y~BnStTXjGUHHB"

def connectToDb():
    res = ""
    conn = None
    try:
        # Establish connection to the PostgreSQL database
        conn = psycopg.connect(
            host=db_host,
            port=db_port,
            dbname=db_name,
            user=db_user,
            password=db_password
        )
        
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute("SELECT version();")
        
        # Fetch one result
        db_version = cursor.fetchone()
        res = f"Connected to: {db_version[0]}"

    except Exception as e:
        res = f"Error connecting to the PostgreSQL database: {e}"

    finally:
        if conn:
            cursor.close()
            conn.close()
            res += "\nPostgreSQL conn is closed"

    return res
    