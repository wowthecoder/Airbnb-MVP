import psycopg
import os
import json
import random
import boto3
from botocore.exceptions import ClientError

# conn details 
db_host = "airbnb-db.cjyekamgomzz.eu-west-2.rds.amazonaws.com"  # RDS Endpoint
db_port = "5432"  # Default PostgreSQL port
db_name = "postgres"
db_user = "jherng"

conn = None

# Set up logging
# logging.basicConfig(
#     filename="app.log",
#     encoding="utf-8",
#     filemode="a",
#     format="{asctime} - {levelname} - {message}",
#     style="{",
#     datefmt="%Y-%m-%d %H:%M",
# )

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
        print(f"Error getting secret: {e}")

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
        print(res)

    except Exception as e:
        res = f"Error connecting to the PostgreSQL database: {e}"
        print(res)

    return res

def getAreas():
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

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
        print(f"Error fetching area descriptions from the PostgreSQL database: {e}")

    return res

def getAllProperties():
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM public.\"Properties\"
            ORDER BY id ASC
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        print(f"Error fetching property data from the PostgreSQL database: {e}")

    return res

# return one row containing 1 if the user exists, empty res set otherwise
def checkUserIdExists(userid):
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            SELECT 1 FROM public.\"UserProfile\" WHERE userid = \'{userid}\' LIMIT 1
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

        # Flatten into single list
        res = res[0]

    except Exception as e:
        conn.rollback()
        print(f"Error checking existence of user id in the PostgreSQL database: {e}")

    return res

def initUser(userid):
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            INSERT INTO public.\"UserProfile\" (userid, money, current_month)
            VALUES (\'{userid}\', 200000, 1)
            ON CONFLICT (userid) DO NOTHING;
        """)
        
        conn.commit()

        res = "ok"

    except Exception as e:
        print(f"Error creating user the PostgreSQL database: {e}")
        conn.rollback()
        res = str(e)

    return res

def getUserById(id):
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            SELECT * FROM public.\"UserProfile\"
            WHERE userid = \'{id}\' LIMIT 1
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

        # Flatten into single list
        res = res[0]

        # round money to nearest integer
        res = (res[0], res[1], round(res[2]))

    except Exception as e:
        print(f"Error fetching user stats from the PostgreSQL database: {e}")

    return res

# return list of ids and rental prices of properties owned by user
def getPropertiesOwned(userid):
    global conn
    if not conn:
        print(connectToDb())

    res = {}
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            SELECT propertyid, rental FROM public.\"UserProperties\"
            WHERE userid = \'{userid}\'
            ORDER BY propertyid ASC
        """)
        
        # Fetch all rows
        response = cursor.fetchall()

        # Convert to dictionary
        for [id, rent] in response:
            res[id] = rent

    except Exception as e:
        print(f"Error fetching user owned properties from the PostgreSQL database: {e}")

    return res

def getEventsInMonth(month):
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            SELECT * FROM public.\"Events\"
            WHERE month = {month}
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        print(f"Error fetching events from the PostgreSQL database: {e}")

    return res

def getGraphData(userid):
    global conn
    if not conn:
        print(connectToDb())

    res = []
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            SELECT * FROM public.\"Financial_records\"
            WHERE userid = \'{userid}\'
            ORDER BY month ASC
        """)
        
        # Fetch all rows
        res = cursor.fetchall()

    except Exception as e:
        print(f"Error fetching graph data from the PostgreSQL database: {e}")

    return res

def calcMonthlyStats(userid, month):
    global conn
    if not conn:
        print(connectToDb())

    month = int(month)
    income = random.randint(1000, 5000)
    expenses = random.randint(500, 2000)
    growth_rate = [0.05/12, 0.035/12, 0.04/12]
    property_values = [200000, 100000, 150000]
    for i in range(len(property_values)):
        property_values[i] += property_values[i] * growth_rate[i] * month 
        property_values[i] = round(property_values[i])

    res = {
        "num_guests": [random.randint(10, 100), random.randint(10, 100), random.randint(10, 100)],
        "rental_income": income,
        "expenses": expenses,
        "net_cash_flow": income - expenses,
        "property_values": property_values
    }

    # try:      
    #     # Create a cursor object to execute queries
    #     cursor = conn.cursor()

    #     # Get the market rental price for all properties
    #     cursor.execute(f"""
    #         SELECT market_price_per_night FROM public.\"Properties\"
    #         ORDER BY id ASC
    #     """)
    #     mp = cursor.fetchall()
    #     mp = [r[0] for r in mp]

    #     # Get the rental price for all properties owned by the user
    #     cursor.execute(f"""
    #         SELECT rental FROM public.\"UserProperties\"
    #         WHERE userid = \'{userid}\'
    #         ORDER BY property_id ASC
    #     """)
    #     rp = cursor.fetchall()
    #     rp = [r[0] for r in rp]


    #     base_num_guests = 50
    #     # Execute queries to find seasonality factor and user defined rent
    #     propertiesId = getPropertiesOwned(userid)


    #     num_guests = 0
    #     rental_income = 0
    #     expenses = 0
    #     net_cash_flow = rental_income - expenses
    #     property_value = 0
        
    #     conn.commit()

    # except Exception as e:
    #     print(f"Error fetching from the PostgreSQL database: {e}")
    #     conn.rollback()

    return res

# Add 1 to month and modify the money
def advanceMonth(userid, diff):
    global conn
    if not conn:
        print(connectToDb())

    res = ""
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            UPDATE public.\"UserProfile\" 
            SET current_month = current_month + 1,
                money = money + {diff}
            WHERE userid = \'{userid}\';
        """)
        
        conn.commit()

        res = "ok"

    except Exception as e:
        print(f"Error advancing month from the PostgreSQL database: {e}")
        conn.rollback()
        res = str(e)

    return res

# deduction is either the full price, or the deposit for mortgages
def buyProperty(userid, propertyid, rent, mortgage, insurance, deduction):
    global conn
    if not conn:
        print(connectToDb())

    res = ""
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            INSERT INTO public.\"UserProperties\" (userid, propertyid, rental, mortgage_per_month, insurance_per_month)
            VALUES (\'{userid}\', {propertyid}, {rent}, {mortgage}, {insurance});

            UPDATE public.\"UserProfile\" 
            SET money = money - {deduction}
            WHERE userid = \'{userid}\';
        """)
        
        conn.commit()

        res = "ok"

    except Exception as e:
        print(f"Error buying property from the PostgreSQL database: {e}")
        conn.rollback()
        res = str(e)

    return res

def setRent(userid, propertyid, rent):
    global conn
    if not conn:
        print(connectToDb())

    res = ""
    try:      
        cursor = conn.cursor()

        cursor.execute(f"""
            UPDATE public.\"UserProperties\" 
            SET rental = {rent}
            WHERE userid = \'{userid}\' AND propertyid = {propertyid};
        """)
        
        conn.commit()

        res = "ok"

    except Exception as e:
        print(f"Error setting rent from the PostgreSQL database: {e}")
        conn.rollback()
        res = str(e)

    return res

def closeConnection():
    global conn
    if conn:
        conn.close()
        return "Connection closed"
    return "No connection to close"
    