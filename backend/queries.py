import psycopg
import os
import logging
import json
import boto3
from botocore.exceptions import ClientError

# conn details 
db_host = "airbnb-db.cjyekamgomzz.eu-west-2.rds.amazonaws.com"  # RDS Endpoint
db_port = "5432"  # Default PostgreSQL port
db_name = "postgres"
db_user = "jherng"
# db_password = "h(rSWH2BaC0vu#Y~BnStTXjGUHHB" 

conn = None

# Set up logging
logging.basicConfig(
    filename="app.log",
    encoding="utf-8",
    filemode="a",
    format="{asctime} - {levelname} - {message}",
    style="{",
    datefmt="%Y-%m-%d %H:%M",
)

def get_secret():
    secret_name = "rds!db-86f7b5c4-d868-4c90-96e3-d006662505f8"
    region_name = "eu-west-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        logging.error(f"Error getting secret: {e}")

    secret = json.loads(get_secret_value_response['SecretString'])
    # print(f"retrieved secret: {secret}")
    return secret["password"]

db_password = get_secret()

def connectToDb():
    global conn
    if conn: 
        return "Already connected to the database"
    res = ""
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
        logging.info(res)

    except Exception as e:
        res = f"Error connecting to the PostgreSQL database: {e}"
        logging.error(res)

    return res

def getAreas():
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute("""
            SELECT description FROM public.\"Areas\"
            ORDER BY id ASC
        """)
        
        # Fetch all rows
        res = cursor.fetchall()
        # Flatten into single list
        res = [r[0] for r in res]

    except Exception as e:
        conn.rollback()
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def getAllProperties():
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute("""
            SELECT * FROM public.\"Properties\"
            ORDER BY id ASC
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

# return one row containing 1 if the user exists, empty res set otherwise
def checkUserIdExists(userid):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute(f"""
            SELECT 1 FROM public.\"User_profile\" WHERE userid = {userid} LIMIT 1
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        conn.rollback()
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def initUser(userid):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute(f"""
            INSERT INTO public.\"User_profile\" (userid, money, current_month)
            VALUES (\'{userid}\', 200000, 1);
        """)
        
        conn.commit()

        res = "ok"

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")
        conn.rollback()
        res = str(e)

    return res

def getUserById(id):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute(f"""
            SELECT * FROM public.\"Users\"
            WHERE userid = {id}
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def getPropertiesOwned(userid):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute(f"""
            SELECT * FROM public.\"Properties\"
            WHERE userid = {userid}
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def getEventsInMonth(month):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute(f"""
            SELECT * FROM public.\"Events\"
            WHERE month = {month}
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def getGraphData(userid):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute(f"""
            SELECT * FROM public.\"Financial_records\"
            WHERE userid = {userid}
            ORDER BY month ASC
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def calcMonthlyStats(userid):
    global conn
    if not conn:
        logging.info(connectToDb())

    res = {
        "num_guests": 0,
        "rental_income": 0,
        "expenses": 0,
        "net_cash_flow": 0,
        "property_value": 0
    }
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        base_num_guests = 50
        # Execute queries to find seasonality factor and user defined rent
        propertiesId = getPropertiesOwned(userid)


        num_guests = 0
        rental_income = 0
        expenses = 0
        net_cash_flow = rental_income - expenses
        property_value = 0
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

    return res

def closeConnection():
    global conn
    if conn:
        conn.close()
        return "Connection closed"
    return "No connection to close"
    