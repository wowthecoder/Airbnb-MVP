import psycopg
import os
import logging

# conn details 
db_host = "airbnb-db.cjyekamgomzz.eu-west-2.rds.amazonaws.com"  # RDS Endpoint
db_port = "5432"  # Default PostgreSQL port
db_name = "postgres"
db_user = "jherng"
# db_password = os.environ.get('DB_PASSWORD')
db_password = "h(rSWH2BaC0vu#Y~BnStTXjGUHHB"

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

    except Exception as e:
        res = f"Error connecting to the PostgreSQL database: {e}"

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

def getAllUserIds():
    global conn
    if not conn:
        logging.info(connectToDb())

    res = []
    try:      
        # Create a cursor object to execute queries
        cursor = conn.cursor()

        # Execute a simple query to check the conn
        cursor.execute("""
            SELECT userid FROM public.\"Users\"
            ORDER BY userid ASC
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        logging.error(f"Error fetching from the PostgreSQL database: {e}")

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
        """)
        
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
    